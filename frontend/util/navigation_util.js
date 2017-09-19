export const fetchTeam = teamData => (
  $.ajax({
    method: 'GET',
    url: `/api/teams/${teamData.id}`
  })
);

export const fetchTeams = () => (
  $.ajax({
    method: 'GET',
    url: `api/teams`
  })
);
