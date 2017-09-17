# React Component Hierarchy

## Functional Component Hierarchy
+ `Root`
  + `App`
    + `MainPage`

## MainPage
+ `MainPage`
  + Components:
    + `DashboardContainer` + `Dashboard`

**Note:** All other components are rendered inside of `MainPage`

## SignupForm
+ `SignupContainer` + `SignupForm`
  + Route: `/#/signup`

## TeamForm
+ `TeamFormContainer` + `TeamForm`
  + Route: `/#/newTeam`
  **Note:** Render team form only when user is not in a team

## Sidebar
+ `SidebarContainer` + `Sidebar`
  + Route: `/#/dashboard`

## Profile
+ `ProfileContainer` + `Profile`
  + Modal

## ProjectForm
+ `ProjectFormContainer` + `ProjectForm`
  + Modal

## Session
+ `SessionFormContainer` + `SessionForm`
  + Route: `/#/login` and `/#/signup`

## Tasks
+ `TasksIndexContainer` + `TasksIndex`
  + Route: `/#/dashboard/list`
  + Components:
    + `TasksItemContainer` + `TasksItem`
    + `TaskFormContainer` + `TaskForm`
      Route: `/#/dashboard/list/:listItemId`
