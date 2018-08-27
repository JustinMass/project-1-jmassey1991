function editReimb(event) {
  event.preventDefault();
  //localStorage.setItem('reimbId', document.getElementById('input-reimbId').value);
  //window.location = 'http://localhost:9001/edit/edit-reimbursement.html';
  
  fetch(`http://localhost:9001/reimbs/reimb/${document.getElementById('input-reimbId').value}`)
  .then(resp => {
    if (resp.status === 400) 
      document.getElementById('error-message').innerText = 'Invalid Reimbursement ID';
      else 
        return resp.json();
      
      throw 'Failed to login'; 
  })
  .then(resp => {
    localStorage.setItem('reimb', JSON.stringify(resp));
    window.location = 'http://localhost:9001/edit/edit-reimbursement.html';
  })
    .catch(err => {
      console.log(err);
    })
}
function addReimbToTable(reimb) {
  const tbody = document.getElementById('movie-table-body');
  //console.log(reimb.reimb_amount);
  tbody.innerHTML += `
  <tr>
  <th scope="row">${reimb.reimb_id}</th>
  <td>${reimb.reimb_submitted.slice(0, 10)}</td>
  <td>${(reimb.reimb_resolved ? reimb.reimb_resolved.slice(0, 10) : '')}</td>
  <td>${reimb.reimb_description}</td>
  <td>${(reimb.reimb_receipt ? reimb.reimb_receipt : '')}</td>
  <td>${reimb.reimb_author}</td>
  <td>${(reimb.reimb_resolver ? reimb.reimb_resolver : '')}</td>
  <td>${reimb.reimb_status}</td>
  <td>${reimb.reimb_type}</td>
  <td>$${(reimb.reimb_amount ? reimb.reimb_amount : '')}</td>
  </tr>
  `
}
user = JSON.parse(localStorage.getItem('user'));
const tableHTML = `
<div class="container" id="movie-table-container">
    <div class="row">
      <table class="table table-striped table-dark col" id="movie-table">
        <thead>
          <tr>
            <th scope="col">Reimbursement ID</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Date Resolved</th>
            <th scope="col">Description</th>
            <th scope="col">Receipt</th>
            <th scope="col">Author ID</th>
            <th scope="col">Resolver ID</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody id="movie-table-body">

        </tbody>
      </table>
    </div>
  </div>
`;

// if a finace manager 
if (user.user_role === 'fm') {
  fetch(`http://localhost:9001/reimbs/`)
    .then(res => res.json())
    .then(res => {
      res.forEach(reimb => {
        addReimbToTable(reimb);
      })
    })
    .catch(err => {
      console.log(err);
    })
  let pending = document.getElementById('pending');
  pending.addEventListener('click', () => {
    let tableBody = document.getElementById('movie-table-container');
    tableBody.innerHTML = tableHTML;
    fetch(`http://localhost:9001/reimbs/pending`)
      .then(res => res.json())
      .then(res => {
        res.forEach(reimb => {
          addReimbToTable(reimb);
        })
      })
      .catch(err => {
        console.log(err);
      })
  })
  let noFilter = document.getElementById('noFilter');
  noFilter.addEventListener('click', () => {
    window.location = 'http://localhost:9001/home/home.html';
  })

}

// else they should be an employee or other role
else {
  document.getElementById('fmEdit-container').style.visibility = "hidden";
  fetch(`http://localhost:9001/reimbs/${user.user_id}`)
    .then(res => res.json())
    .then(res => {
      res.forEach(reimb => {
        addReimbToTable(reimb);
      })
    })
    .catch(err => {
      console.log(err);
    })

  filters = ['pending', 'approved', 'declined'];
  for (let i = 0; i < filters.length; i++) {
    filter = document.getElementById(`${filters[i]}`);
    filter.addEventListener('click', () => {
      let tableBody = document.getElementById('movie-table-container');
      tableBody.innerHTML = tableHTML;
      fetch(`http://localhost:9001/reimbs/${filters[i]}/${user.user_id}`)
        .then(res => res.json())
        .then(res => {
          res.forEach(reimb => {
            addReimbToTable(reimb);
          })
        })
        .catch(err => {
          console.log(err);
        })
    })
  }
  let noFilter = document.getElementById('noFilter');
  noFilter.addEventListener('click', () => {
    window.location = 'http://localhost:9001/home/home.html';
  })
}
