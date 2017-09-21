export const createTeam = team => (
  $.ajax({
    method: 'POST',
    url: 'api/teams',
    data: team
  })
);

export const leaveTeam = team => {
  return (
  $.ajax({
    method: 'DELETE',
    url: `api/user_teams/${team.team.id}`
  })
);
};
