import * as React from 'react';
import AppNav from '../nav/nav.component'
import { IHomeState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { loadTable } from '../../actions/home/home.actions'

interface IProps extends IHomeState {
  loadTable: (id: number) => any,
}

export class HomeComponent extends React.Component<IProps, any> {

  public render() {
    return (
      <div id="homeContainer">
        <AppNav />
        <div id="tableContainer">
          home component
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.home;
const mapDispatchToProps = {
  loadTable
}

export default connect(mapStateToProps, mapDispatchToProps)
  (HomeComponent);

