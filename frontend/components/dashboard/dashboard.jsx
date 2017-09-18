import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    

    return (
      <div>
        <nav>
          <h1>Welcome! This is the Dashboard</h1>
          <button onClick={this.props.logout}>Log Out</button>
        </nav>
      </div>
    );
  }

}
