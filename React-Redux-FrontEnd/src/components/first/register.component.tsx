import * as React from 'react';
// import AppNav from '../nav/nav.component'
import { RouteComponentProps } from 'react-router';
import { user } from '../home/home.component'
import { environment } from '../../environment';

interface IProps extends RouteComponentProps<{}> {

}

export class RegisterComponent extends React.Component<IProps, {}> {

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.user_role = 'employee';

  
      fetch(`${environment.context}users`, {
          body: JSON.stringify(user),
          // credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'POST',
      })
          .then(resp => {
             // console.log(resp.status)
              if (resp.status === 401) {
                  console.log('got 401')
              } else if (resp.status === 201) {
                  return resp.json();
              }
             // throw new Error('Failed to login');
             return null;
          })
          .then(resp => {
              console.log(`Created User with id:${resp}`);
          })
          .catch(err => {
              console.log(err);
          });
         this.props.history.push('/sign-in');
  }

  public render() {
    return (
      <div className="homeContainer">
        {/* <AppNav /> */}
        <div className="row align-items-center">
        <div className="col-4"></div>
        <form className="col-4 registerForm" onSubmit={this.submit}>
             
                <label>Username</label>
                <input type="text" className="form-control newReimbForm" placeholder="Username" onChange={(e: any) => {
                  user.username = e.target.value;
                }}></input>
                <label>First Name</label>
                <input type="text" className="form-control newReimbForm" placeholder="First Name" onChange={(e: any) => {
                  user.user_fname = e.target.value;
                }}></input>
                <label>Last Name</label>
                <input type="text" className="form-control newReimbForm" placeholder="Last Name" onChange={(e: any) => {
                  user.user_lname = e.target.value;
                }}></input>
                <label>Email</label>
                <input type="text" className="form-control newReimbForm" placeholder="Email" onChange={(e: any) => {
                  user.user_email = e.target.value;
                }}></input>
                <label>Password</label>
                <input type="password" className="form-control newReimbForm" placeholder="Password" onChange={(e: any) => {
                  user.user_pass = e.target.value;
                }}></input>
                <button className="btn btn-dark btn-block" type="submit">Register</button>
              </form>
        </div>
      </div>
    );
  }
}

