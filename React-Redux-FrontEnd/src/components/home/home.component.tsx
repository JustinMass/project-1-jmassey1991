import * as React from 'react';
import AppNav from '../nav/nav.component'
import { IHomeState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { loadTable, loadFmTable, filterTable, filterFmTable } from '../../actions/home/home.actions'

interface IProps extends IHomeState {
  filterFmTable: (filter: string) => any,
  filterTable: (filter: string, id: number) => any,
  loadTable: (id: number) => any,
  loadFmTable: () => any,
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

export class HomeComponent extends React.Component<IProps, any> {


  // console.log(user);


  public componentDidMount() {
    {
      const userString = localStorage.getItem('user')
      if (userString) {
        user = JSON.parse(userString);
      }
        if(user.user_role === 'fm') { this.props.loadFmTable() }
        else { this.props.loadTable(user.user_id); }

    }
  }

  public filterReimbs = (e: any) => {
    if(e.target.value === 'default'){this.props.loadTable(user.user_id)}
    else {this.props.filterTable(e.target.value, user.user_id);}
  }

  public render() {
    const { reimbs } = this.props;

    return (
      <div id="homeContainer">
        <AppNav />
        <div id="tableContainer">
          <div className="container" id="movie-table-container">
            <div className="row">
              <table className="table table-striped table-dark col" id="reimb-table">
                <thead>
                  <tr>
                    <th scope="col" className="empHide">Reimbursement ID</th>
                    <th scope="col">Date Submitted</th>
                    <th scope="col">Date Resolved</th>
                    <th scope="col">Description</th>
                    <th scope="col">Receipt</th>
                    <th scope="col" className="empHide">Author ID</th>
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
                        <th scope="row">{reimb.reimb_id}</th>
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
            <p className="h5">Filter Reimbursements
            </p >
            <select className="custom-select bg-dark text-white" onChange={this.filterReimbs}>
              <option value="default">Default</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>

            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.home;
const mapDispatchToProps = {
  filterFmTable,
  filterTable,
  loadFmTable,
  loadTable,
}

export default connect(mapStateToProps, mapDispatchToProps)
  (HomeComponent);

