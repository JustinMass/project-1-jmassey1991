function createReimb(event) {
    event.preventDefault();
  
    const reimb_submitted = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const reimb_description = document.getElementById('input-description').value;
    const reimb_author = JSON.parse(localStorage.getItem('user')).user_id;
    const reimb_status = 'pending';
    const reimb_type = document.getElementById('input-type').value;
    const reimb_amount = document.getElementById('input-amount').value;
  
    const reimb = {
      reimb_submitted,
      reimb_description,
      reimb_author,
      reimb_status,
      reimb_type,
      reimb_amount
    }
    
    fetch('http://localhost:9001/reimbs', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reimb)
    })
    .then(resp => {
        if (resp.status === 403) {
          document.getElementById('error-message').innerText = 'You do not have access to this function';
        } else 
          return resp.json();
          
          throw 'Bad';
      })
    .then(resp => {
      window.location = 'http://localhost:9001/home/home.html';
    })
    .catch(err => {
      console.log(err);
    });
  }