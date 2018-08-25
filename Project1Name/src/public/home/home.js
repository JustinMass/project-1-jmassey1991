function addUserToTable(user) {
  const tbody = document.getElementById('movie-table-body');
  tbody.innerHTML += `
  <tr>
  <th scope="row">${user.user_id}</th>
  <td>${user.username}</td>
  <td>${user.user_pass}</td>
  <td>${user.user_fname}</td>
  <td>${user.user_lname}</td>
  <td>${user.user_email}</td>
  <td>${user.user_role}</td>
  </tr>
  `
}

fetch('http://localhost:9001/users')
  .then(res => res.json())
  .then(res => {
    res.forEach(user => {
      addUserToTable(user);
    })
  })
  .catch(err => {
    console.log(err);
  })