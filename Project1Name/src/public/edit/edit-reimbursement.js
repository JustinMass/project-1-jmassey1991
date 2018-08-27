function editReimb(event) {
    event.preventDefault();

    let reimb = JSON.parse(localStorage.getItem('reimb'));
    reimb.reimb_resolved = new Date().toISOString().slice(0, 19).replace('T', ' ');
    reimb.reimb_receipt = document.getElementById('input-receipt').value;
    reimb.reimb_resolver = JSON.parse(localStorage.getItem('user')).user_id;
    reimb.reimb_status = document.getElementById('input-status').value;
    //console.log(reimb);

    fetch('http://localhost:9001/reimbs', {
     method: 'PUT',
     body: JSON.stringify(reimb),
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
        if (resp.status === 403) {
          document.getElementById('error-message').innerText = 'You do not have access to this function';
        } else 
          return resp.json();
      })
    .then(resp => {
        
      window.location = 'http://localhost:9001/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });
  }



