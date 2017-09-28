export const createTask = task => (
  $.ajax({
    method: 'POST',
    url: 'api/tasks',
    data: { task }
  })
);

export const updateTask = task => (
  $.ajax({
    method: 'PATCH',
    url: `api/tasks/${task.id}`,
    data: { task }
  })
);

export const deleteTask = task => (
  $.ajax({
    method: 'DELETE',
    url: `api/tasks/${task.id}`
  })
);
