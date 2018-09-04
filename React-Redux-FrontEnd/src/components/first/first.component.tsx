import * as React from 'react';
import AppNav from '../nav/nav.component'

export class FirstComponent extends React.Component {

  public render() {
    return (
      <div className="homeContainer">
        <AppNav />
        Register User Page
      </div>
    );
  }
}

