export const createTeam = team => (
  $.ajax({
    method: 'POST',
    url: 'api/teams',
    data: team
  })
);
