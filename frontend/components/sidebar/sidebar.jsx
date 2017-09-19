import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const projects = this.props.entities.projects
    return (
      <div>
        <p>Sidebar Component</p>
      </div>
    );
  }
}
