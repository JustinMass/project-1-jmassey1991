import * as React from 'react';
import AppNav from '../nav/nav.component'
import { IHomeState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { loadTable, filterTable, addReimb } from '../../actions/home/home.actions'
import { RouteComponentProps } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IProps extends RouteComponentProps<{}>, IHomeState {
  addReimb: (type: string, userId: number, description: string, amount: number) => any,
  filterTable: (filter: string, id: number) => any,
  loadTable: (id: number) => any,
}
export let user = {
  user_email: '',
  user_fname: '',
  user_id: 0,
  user_lname: '',
  user_pass: '',
  user_role: '',
  username: '',
}

export let Reimbform = {
  amount: 0,
  description: '',
  type: '',
}

export class HomeComponent extends React.Component<IProps, {}> {



  public componentDidMount() {
    {
      const userString = localStorage.getItem('user')
      if (userString) {
        user = JSON.parse(userString);

        if (user.user_role === 'fm') { this.props.history.push('/fmhome'); }
        else { this.props.loadTable(user.user_id); }
      }

    }
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addReimb(Reimbform.type, user.user_id, Reimbform.description, Reimbform.amount);
    toast("Successfully Added Reimbursement", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(() => { this.props.loadTable(user.user_id); }, 500);
  }

  public filterReimbs = (e: any) => {
    if (e.target.value === 'default') { this.props.loadTable(user.user_id) }
    else { this.props.filterTable(e.target.value, user.user_id); }
  }

  public render() {
    const { reimbs } = this.props;

    return (
      <div className="homeContainer">
        <AppNav />
        <ToastContainer autoClose={4000} />
        <h4 className="welcomeHeading">Welcome {user.user_fname}</h4>
        <div id="tableContainer">
          <div className="container" id="movie-table-container">
            <div className="row">
              <table className="table table-striped table-dark col" id="reimb-table">
                <thead>
                  <tr>
                    <th scope="col">Date Submitted</th>
                    <th scope="col">Date Resolved</th>
                    <th scope="col">Description</th>
                    <th scope="col">Receipt</th>
                    <th scope="col">Resolver ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                {reimbs[0] && reimbs[0].reimb_id !== 0 &&
                  <tbody id="reimb-table-body">

                    {reimbs.map((reimb: any) =>
                      <tr key={reimb.reimb_id}>
                        <td scope="row">{reimb.reimb_submitted.slice(0, 10)}</td>
                        <td>{(reimb.reimb_resolved ? reimb.reimb_resolved.slice(0, 10) : '')}</td>
                        <td>{reimb.reimb_description}</td>
                        <td>{(reimb.reimb_receipt ? reimb.reimb_receipt : '')}</td>
                        <td>{(reimb.reimb_resolver ? reimb.reimb_resolver : '')}</td>
                        <td>{reimb.reimb_status}</td>
                        <td>{reimb.reimb_type}</td>
                        <td>${(reimb.reimb_amount ? reimb.reimb_amount : '')}</td>
                      </tr>
                    )}

                  </tbody>}
              </table>
            </div>
            <div className="row">
              <p className="h5">Filter Reimbursements
              </p >
              <select className="custom-select bg-dark text-white" onChange={this.filterReimbs}>
                <option value="default">Default</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
              <button className="btn btn-dark" type="button" data-toggle="collapse" data-target="#collapseForm" aria-expanded="false" aria-controls="collapseExample">
                Add New Reimbursement
              </button>
            </div>
            <div className="row align-items-center">
              <form className="collapse col-4" id="collapseForm" onSubmit={this.submit}>
                <label>Type</label>
                <select className="form-control newReimbForm" onChange={(e: any) => {
                  Reimbform.type = e.target.value;
                }}>
                  <option></option>
                  <option value="Logging">Lodging</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                  <option value="Food">Food</option>
                </select>
                <label>Description</label>
                <input type="text" className="form-control newReimbForm" placeholder="Description" onChange={(e: any) => {
                  Reimbform.description = e.target.value;
                }}></input>
                <label>Amount</label>
                <input type="number" className="form-control newReimbForm" placeholder="Amount" onChange={(e: any) => {
                  Reimbform.amount = e.target.value;
                }}></input>
                <button id="newReimbButton" className="btn btn-dark btn-block" type="submit">Create Reimbursement</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.home;
const mapDispatchToProps = {
  addReimb,
  filterTable,
  loadTable,
}

export default connect(mapStateToProps, mapDispatchToProps)
  (HomeComponent);

