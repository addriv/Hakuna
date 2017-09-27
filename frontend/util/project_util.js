export const createProject = project => (
  $.ajax({
    method: 'POST',
    url: `api/teams/${project.team_id}/projects`,
    data: { project }
  })
);

export const updateProject = project => (
  $.ajax({
    method: 'PATCH',
    url: `api/teams/${project.team_id}/projects/${project.id}`,
    data: { project }
  })
);

export const deleteProject = project => (
  $.ajax({
    method: 'DELETE',
    url: `api/teams/${project.team_id}/projects/${project.id}`
  })
);
