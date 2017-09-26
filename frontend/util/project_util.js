export const createProject = project => (
  $.ajax({
    method: 'POST',
    url: `api/teams/${project.team_id}/projects`,
    data: { project }
  })
);
