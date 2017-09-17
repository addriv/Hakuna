export const signup = (userData) => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: userData
  })
);

export const login = (userData) => (
  $.ajax({
    method: 'POST',
    url: 'api/sessions',
    data: userData
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: 'api/sessions'
  })
);
