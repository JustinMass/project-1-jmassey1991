//console.log('loading js');
function createUser(event) {
  event.preventDefault();

  const username = document.getElementById('input-username').value;
  const user_pass = document.getElementById('input-password').value;
  const user_fname = document.getElementById('input-fname').value;
  const user_lname = document.getElementById('input-lname').value;
  const user_email = document.getElementById('input-email').value;
  const user_role = document.getElementById('input-role').value;

  const user = {
    username,
    user_pass,
    user_fname,
    user_lname,
    user_email,
    user_role
  }
  
  fetch('http://localhost:9001/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:9001/login-page/login.html';
  })
  .catch(err => {
    console.log(err);
  });
}
if(!localStorage.getItem('user') || JSON.parse(localStorage.getItem('user')).user_role !== 'fm'){
  document.getElementById('roleInput').style.visibility = "hidden";
  document.getElementById('input-role').value = 'employee';
}