export const teamsSelector = state => {
  const teams = state.session.teams;
  if (teams){
    return Object.values(teams);
  }
};
