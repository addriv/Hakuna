export const fetchTeam = teamId => (
  $.ajax({
    method: 'GET',
    url: `/api/teams/${teamId}`
  })
);

export const fetchTeams = () => (
  $.ajax({
    method: 'GET',
    url: `api/teams`
  })
);
