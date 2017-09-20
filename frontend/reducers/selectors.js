export const teamsSelector = state => {
  const teams = state.session.teams;
  if (teams){
    return Object.values(teams);
  }
};

export const tasksSelector = state => {
  const tasks = state.entities.tasks;
  if (tasks){
    return Object.values(tasks);
  }
};

export const teamMembersSelector = state => {
  const members = state.entities.members;
  if (members){
    return Object.values(members);
  }
};

export const projectsSelector = state => {
  const projects = state.entities.projects;
  if (projects){
    return Object.values(projects);
  }
};

export const currentUserInitials = state => {
  const currentUser = state.session.currentUser;
  if (currentUser){
    return currentUser.name.split(' ')
                    .map(name => name[0])
                    .join('');
  }
};
