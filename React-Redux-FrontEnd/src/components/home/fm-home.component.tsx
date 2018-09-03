import * as React from 'react';
import { IHomeState, IState } from '../../reducers';
import AppNav from '../nav/nav.component'
import { loadFmTable, filterFmTable, approveDeny } from '../../actions/home/home.actions'
import { connect } from 'react-redux';


export let user = {
  user_email: '',
  user_fname: '',
  user_id: 0,
  user_lname: '',
  user_pass: '',
  user_role: '',
  username: '',
}

export let checkedReimbs: number[] = [];

interface IProps extends IHomeState {
  filterFmTable: (filter: string) => any,
  loadFmTable: () => any,
  approveDeny: (status: string, userId: number, reimbs: any[], ids: any[]) => any
}

export class FmHomeComponent extends React.Component<IProps, any> {

  public componentDidMount() {
    {
      const userString = localStorage.getItem('user')
      if (userString) {
        user = JSON.parse(userString);
        this.props.loadFmTable();
      }

    }
  }
  public filterReimbs = (e: any) => {
    if (e.target.value === 'default') { this.props.loadFmTable(); }
    else { this.props.filterFmTable(e.target.value); }
  }

  public denyReimbs = () => {
    this.props.approveDeny('declined', user.user_id, this.props.reimbs, checkedReimbs);
    setTimeout(() => {  this.props.loadFmTable(); }, 3000);
    // this.props.loadFmTable();
  }

  public approveReimbs = () => {
    this.props.approveDeny('approved', user.user_id, this.props.reimbs, checkedReimbs);
    setTimeout(() => {  this.props.loadFmTable(); }, 2500);
    // this.props.loadFmTable();
  }

  public addorRemoveReimb = (e: any) => {
    if (checkedReimbs.indexOf(e.target.value) > -1) {
      for (let i = 0; i < checkedReimbs.length; i++) {
        if (checkedReimbs[i] === e.target.value) {
          checkedReimbs.splice(i, 1);
        }
      }
    }
    else {
      checkedReimbs.push(e.target.value);
    }
    // console.log(checkedReimbs);

  }


  public render() {
    const { reimbs } = this.props;

    return (
      <div id="homeContainer">
        <AppNav />
        <h4 className="welcomeHeading">Welcome {user.user_fname}</h4>
        <div id="tableContainer">
          <div className="container" id="movie-table-container">
            <div className="row">
              <table className="table table-striped table-dark col" id="{reimb-table}">
                <thead>
                  <tr>
                    <th scope="col">Select</th>
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
                {reimbs[0] && reimbs[0].reimb_id !== 0 &&
                  <tbody id="reimb-table-body">

                    {reimbs.map((reimb: any) =>
                      <tr key={reimb.reimb_id}>
                        <th scope="row"><input type="checkbox" value={reimb.reimb_id} onClick={this.addorRemoveReimb}></input></th>
                        <td>{reimb.reimb_submitted.slice(0, 10)}</td>
                        <td>{(reimb.reimb_resolved ? reimb.reimb_resolved.slice(0, 10) : '')}</td>
                        <td>{reimb.reimb_description}</td>
                        <td>{(reimb.reimb_receipt ? reimb.reimb_receipt : '')}</td>
                        <td>{reimb.reimb_author}</td>
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
              <p className="h5">Filter Reimbursements:
            </p >
              <select className="custom-select bg-dark text-white col-2" onChange={this.filterReimbs}>
                <option value="default">Default</option>
                <option value="pending">Pending</option>
              </select>
              <button className="btn btn-light btn-block col-2 fmButtons" onClick={this.approveReimbs}>Approve</button>
              <button className="btn btn-light btn-block col-2 fmButtons" onClick={this.denyReimbs}>Deny</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.home;
const mapDispatchToProps = {
  approveDeny,
  filterFmTable,
  loadFmTable
}

export default connect(mapStateToProps, mapDispatchToProps)
  (FmHomeComponent);