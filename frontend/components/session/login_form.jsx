import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type){
    return (event) => this.setState( { [type]: event.target.value } );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.login({ user: this.state });
  }

  render(){
    return (
      <div id="login">
        <h2>LOG IN</h2>

          <label>EMAIL ADDRESS</label>
          <input
            onChange={this.handleInput('email')}
            type='text'
            value={this.state.email}></input>

          <label>PASSWORD</label>
          <input
            onChange={this.handleInput('password')}
            type='password'
            value={this.state.password}></input>

          <button onClick={this.handleSubmit}>LOG IN</button>
      </div>
    );
  }
}
