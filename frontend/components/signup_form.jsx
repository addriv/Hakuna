import React from 'react';

export default class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
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
    this.props.signup({ user: this.state });
  }

  render(){
    return (
      <div id="signup">
        <h2>SIGN UP</h2>

          <label for='name'>NAME</label>
          <input
            onChange={this.handleInput('name')}
            value={this.state.name}></input>

          <label for='email'>EMAIL ADDRESS</label>
          <input
            onChange={this.handleInput('email')}
            value={this.state.email}></input>

          <label for='password'>PASSWORD</label>
          <input
            onChange={this.handleInput('password')}
            value={this.state.password}></input>

        <button onClick={this.handleSubmit}>SIGN UP</button>
      </div>
    );
  }
}
