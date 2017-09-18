import React from 'react';

export default class LoginForm extends React.Component {
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
      <div id='signup-auth'>
        <div className='signup-content'>
          <form className='signup-form'>
            <h2>Sign Up</h2>

            <label>NAME</label>
            <input
              onChange={this.handleInput('name')}
              type='text'
              value={this.state.name}></input>

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

            <button onClick={this.handleSubmit}>SIGN UP</button>
          </form>
        </div>
      </div>
    );
  }
}
