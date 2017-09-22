export const fetchTeam = teamId => {
  return (
  $.ajax({
    method: 'GET',
    url: `/api/teams/${teamId}`
  })
);
};

export const fetchTeams = () => (
  $.ajax({
    method: 'GET',
    url: `api/teams`
  })
);

export const objectComparisonByKeys = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();

  if (obj1Keys.length !== obj2Keys.length) return false;
  else {
    for (let i = 0; i < obj1Keys.length; i++){
      if (obj1Keys[i] !== obj2Keys[i]) return false;
    }
  }

  return true;
};

export const updateTeam = team => {
  return $.ajax({
    method: 'PATCH',
    url: `api/teams/${team.id}`,
    data: { team }
  });
};
