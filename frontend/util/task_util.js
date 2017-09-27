export const createTask = task => (
  $.ajax({
    method: 'POST',
    url: 'api/tasks',
    data: { task }
  })
);
