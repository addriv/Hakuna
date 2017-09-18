import React from 'react';
import { Link } from 'react-router-dom';

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
      <div id='login-auth'>
        <div className='login-content'>
          <form className='login-form'>
            <h2>Log In</h2>

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
            <div className='login-btn'>
              <button onClick={this.handleSubmit}>LOG IN</button>
            </div>
          </form>

          <div className='signup'>
            <p>Don't have an account?</p>
            <Link to='/signup' className='signup-btn'>SIGN UP</Link>
          </div>
        </div>
      </div>
    );
  }
}
