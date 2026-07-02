# PoE2 Crafting Planner — Design Doc

> Goal: given a **target item** (base + item level + desired modifiers), output a
> **step-by-step crafting method** that produces it, ranked by **cheapest** (default)
> or **highest probability**, with the **odds of every step** shown.

**Decisions locked (2026-07):**
- **Stack:** TypeScript full-stack (Node engine + CLI now, web UI later).
- **First deliverable:** CLI script — paste in-game item text → plan.
- **First objective:** *Cheapest* plans first (pricing/trade data is in the first slice).
- This lives in its own workspace (`poe2-crafting-planner/`); the legacy Rails/React
  app in the repo root is unrelated and untouched.

---

## 1. The problem, precisely

**Input:** target item = `{ base, itemLevel, prefixes[], suffixes[] }` where each desired
mod carries a **desired tier or minimum tier**. Optionally a "good enough" spec
(e.g. *T1 life + any T1 resist + one open suffix*) rather than an exact roll.

**Output:** an ordered list of crafting steps (currency / essence / omen / rune actions),
each annotated with:
- the **probability** of that step succeeding,
- the **expected number of attempts** (and resets) to pass it,
- the **expected cost** of the step,
and a **total** expected cost + overall success probability for the plan.

**Why it's hard.** Every currency is a *stochastic* operator on item state, and we want
the cheapest/most-likely *sequence* of operators reaching the target. That's a
Markov Decision Process over a combinatorially huge state space — no exact solver is
tractable. We tame it with an analytic probability engine + a library of known crafting
"recipes" that prune the search to human-plausible sequences.

---

## 2. Architecture (5 layers)

```
┌─────────────────────────────────────────────────────────────┐
│ L4  Monte Carlo validator  (simulate top plan 1e5–1e6 runs)  │
├─────────────────────────────────────────────────────────────┤
│ L3  Planner / optimizer   (template-guided beam search)      │
│       → Pareto set: cheapest ↔ highest-probability           │
├─────────────────────────────────────────────────────────────┤
│ L2  Recipe library        (essence-slam, fracture, omen-exalt…)│
├─────────────────────────────────────────────────────────────┤
│ L1  Probability engine    (weighted draws, conditional odds)  │
├─────────────────────────────────────────────────────────────┤
│ L0  Data model + datasets (mods/tiers/weights/ilvl, prices)  │
└─────────────────────────────────────────────────────────────┘
```

### L0 — Data model

```ts
type AffixType = "prefix" | "suffix";

interface ModTier {
  tier: number;         // T1 = best
  ilvl: number;         // item-level gate to roll this tier
  weight: number;       // relative probability among eligible mods
  valueMin: number;
  valueMax: number;
}

interface Mod {
  id: string;
  group: string;        // mods in the same group are mutually exclusive
  affixType: AffixType;
  tags: string[];       // e.g. ["life"], ["fire","resistance"]
  tiers: ModTier[];
}

interface ItemState {
  base: string;
  ilvl: number;
  rarity: "normal" | "magic" | "rare";
  prefixes: RolledMod[]; // max 3 (rare)
  suffixes: RolledMod[]; // max 3 (rare)
  quality: number;
  fractured: string[];   // mod ids locked by Fracturing
  corrupted: boolean;
}
```

Each **currency / essence / omen / rune** is modeled as a transition:
`apply(action, state) -> Array<{ state: ItemState, p: number }>` plus a `cost`.
Deterministic actions (essence-guaranteed mod, rune socket) collapse to a single `p = 1`
branch for their guaranteed portion.

### L1 — Probability engine (the "account for odds" core)

Adding a specific mod is a **weighted draw without replacement** over the eligible pool:

```
P(hit target mod) = weight(target, eligible at ilvl, group not blocked, slot open)
                    ─────────────────────────────────────────────────────────────
                    Σ weight(every eligible mod for that affix type)
```

- **Multi-mod targets** = a product of *conditional* probabilities; order matters as the
  pool fills and groups get blocked. The engine computes the best ordering.
- **Spam-until-hit** step → expected attempts `E = 1/p` (geometric), with any reset cost
  (scour / re-buy base / vendor) folded into per-attempt cost.
- **Omens** reshape the draw (Sinistral/Dextral = prefix/suffix only, Whittling = remove
  lowest, Homogenising = same-tag) → the engine adjusts the eligible pool + normalization.
- **Removal** actions (Chaos remove-one, Annul) draw over *existing* mods.

Unit-tested against known Craft of Exile numbers; cross-checked by L4 simulation.

### L2 — Recipe library (heuristic pruning)

Parameterized templates matched against a target, each knowing its preconditions:

| Recipe | When it wins |
|---|---|
| Essence-slam → aug/exalt rest | one guaranteed mod anchors the item |
| Transmute/Aug spam → Regal → finish | cheap magic-base setup |
| Chaos spam (targeted reroll) | 1-2 mods off on an otherwise-good rare |
| **Fracture** hard mod → freely slam rest | one rare mod + several common ones |
| Omen-controlled Exalt (Sinistral/Dextral/Whittling/Homogenising) | precise prefix/suffix control |
| **Rune / soul-core** socket | target mod available as fixed rune → near-free, always preferred |
| Desecration | boss/desecrated-only mods |

### L2b — Slot control, blocking & fill-and-wipe (advanced odds manipulation)

These techniques are **first-class**, because they are precisely how a crafter raises the
probability of a desired mod — they change the *denominator* of the L1 formula, not just
the numerator. The engine must model them, not approximate them away.

- **Affix-type forcing (slot filling).** If all suffix slots are occupied, an "add a random
  mod" currency (Exalt/Regal) is *forced* to add a **prefix** — so `P(hit desired prefix)`
  jumps from `weight / Σ(all open affixes)` to `weight / Σ(open prefixes only)`. Filling the
  opposite affix type is a legitimate probability lever the planner can propose. (PoE2 also
  offers **Omen of Sinistral/Dextral Exaltation** to target prefix/suffix directly — often a
  cleaner substitute for physical slot-filling; the planner compares both.)
- **Group blocking.** Two mods of the same `group` are mutually exclusive, so an existing
  mod removes its whole group from the eligible pool. Deliberately seeding a low-value mod of
  a competing group shrinks the pool your desired mod competes against. Modeled directly by
  the eligible-pool computation in L1.
- **Tag biasing.** **Omen of Homogenising** restricts an added mod to share a tag with an
  existing mod — another way to collapse the pool toward what you want.
- **Fill-and-wipe / metacrafting.** Add filler mods to shape a later roll, then remove them.
  The planner can generate these as multi-step plans **but must price the removal honestly**:
  PoE2 is an *additive* system with **weak targeted removal** — the main tools are
  **Orb of Annulment** (removes a *random* mod), **Omen of Whittling** (removes the *lowest*
  mod), **Chaos** (remove-one + add-one), and **Fracturing** (locks a mod). There is no cheap
  PoE1-style "remove only the crafted mod." So a "wipe later" step carries a real risk of
  destroying a *good* mod, and that failure branch (with its probability and the cost of
  recovering) is part of the plan's expected cost. **Omen of Whittling + a deliberately-low
  filler**, or **Fracture the keeper first, then annul freely**, are the safe patterns the
  recipe library encodes for this.

Consequence for L1: probabilities are always computed against the *current* eligible pool
given slot occupancy, filled slots, and blocked groups — never a flat per-mod constant.
Consequence for L3: fill/block/wipe are just candidate actions in the search, scored by the
**joint** odds across the fill step, the target step, and the removal step (including the
branch where removal hits the wrong mod).

### L3 — Planner / optimizer

Template-guided **beam / best-first search** over action sequences (templates keep the
branching factor sane). Each candidate plan scored on **(expected cost, success prob)**;
return the **Pareto-optimal** set. Default sort = cheapest; toggle = highest probability.
Because objective #1 is *cheapest*, pricing (L0 economy data) is wired in from milestone 1.

### L4 — Monte Carlo validator

Run the top plan 1e5–1e6 times to confirm analytic odds/cost (Craft of Exile recommends
this for crafts rarer than ~1/100). Also serves as a regression oracle in tests.

---

## 3. Data sourcing (the #1 accuracy risk)

PoE2 mod **weights are not in the game client** — they are datamined / reverse-engineered
by the community (recombinator method). Therefore:

- **Mod pools / tiers / ilvl gates / tags / weights:** [poe2db.tw](https://poe2db.tw/us/)
  and [Craft of Exile poe2 weightings](https://www.craftofexile.com/?game=poe2).
- **Currency & item prices:** official PoE2 **trade API** (respect rate limits + ToS);
  poe.ninja-style economy snapshots as a fallback/cache for currency ratios.
- Store datasets as **versioned JSON keyed to game patch**, keep them swappable, and
  surface a *"weights are approximate / patch X.Y"* caveat in output.

**Input convenience:** PoE2's in-game **Ctrl+C** copies an item as a standard text block
(class, rarity, base, item level, affixes). The CLI parses that block directly → auto-maps
each line to a mod + tier → feeds the planner. This is the primary MVP input.

---

## 4. Proposed TS project layout

```
poe2-crafting-planner/
  package.json            # ESM, tsx for dev, vitest for tests
  tsconfig.json
  data/
    patch-0.5/            # versioned datasets
      mods.<base>.json
      currency-prices.json
  src/
    model/                # L0 types, ItemState, actions
    parse/               # in-game item-text parser
    engine/              # L1 probability math
    recipes/             # L2 templates
    planner/             # L3 search + Pareto ranking
    sim/                 # L4 Monte Carlo
    pricing/             # trade API client + cache
    cli/                 # `plan` command (paste item → ranked plans)
  test/                  # vitest, validated vs Craft of Exile numbers
```

CLI sketch: `npx poe2plan --paste` (reads item text from stdin/clipboard) →
prints ranked plans, cheapest first, each step with odds + expected cost.

---

## 5. Milestones

- **M0 — Data spike.** Versioned JSON for a few bases (1 weapon, 1 armour, 1 ring) with
  mods/tiers/weights/ilvl/tags. Validate weights vs Craft of Exile.
- **M1 — Engine + pricing + CLI (cheapest slice).** Item-text parser, probability engine
  (single + multi-mod odds, expected attempts), currency pricing, and a CLI that outputs a
  ranked-by-cost plan for one hard-coded recipe. Unit tests vs Craft of Exile.
- **M2 — Recipe library + planner.** 3–4 strategies, template-guided search, Pareto ranking,
  `--cheapest` / `--highest-prob` toggle, "good enough" (tier-threshold) targets.
- **M3 — Monte Carlo validator.** Simulation-backed confidence intervals on cost/odds.
- **M4 — Local web UI.** Paste box → ranked plans → expandable per-step odds (React front on
  a thin API over the same engine).

---

## 6. Open design questions / risks

1. **Weight accuracy & patch drift** — mitigated by versioned datasets + Craft-of-Exile
   validation + simulation.
2. **Combinatorial blow-up** in the planner — mitigated by template-guided bounded search.
3. **Omen / meta-craft complexity & churn** — model as pluggable draw modifiers.
4. **Exact roll vs "good enough"** — support tier thresholds + partial goals, not just exact.
5. **Mechanic-gated mods** (desecration, runes, corruption-only) — encode availability so the
   planner never proposes an impossible slam.
7. **Weak targeted removal in PoE2** — "fill-and-wipe" plans must price the risk that a random
   Annul/Whittling removes a *good* mod; the safe patterns (fracture-the-keeper, whittle-a-
   filler) are encoded in the recipe library (see §L2b).
6. **Trade API limits/ToS** — cache prices, back off, allow an offline price file.

---

### Sources
- Maxroll — PoE2 crafting overview: https://maxroll.gg/poe2/resources/path-of-exile-2-crafting-overview
- Craft of Exile (PoE2): https://www.craftofexile.com/?game=poe2
- poe2db: https://poe2db.tw/us/
- PoE2 crafting codex: https://domistae.github.io/poe2-leveling/poe2_crafting_codex.html
- Official PoE data exports: https://www.pathofexile.com/developer/docs/data
