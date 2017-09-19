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

  componentDidMount(){
    this.props.clearSessionErrors();
  }

  handleInput(type){
    return (event) => this.setState( { [type]: event.target.value } );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.login({ user: this.state });
  }

  render(){
    const sessionErrors = this.props.errors.session;
    let errors;
    if (sessionErrors.length > 0){
      errors = sessionErrors.map((error, i) => (
        <li key={i}>{error}</li>
      ));
    }

    return (
      <div id='login-auth'>
        <div className='login-content'>
          <div className='front-display'>

            <div className='logo'>
              <img src='http://res.cloudinary.com/dcl72qrya/image/upload/v1505801236/full_logo_medium_q8xov2.png'/>
              <p>It means no worries, your team solutions are one step away</p>
            </div>

          </div>

          <div className='test'>

            <div className='login-form'>
              <form>
                <h2>Log In</h2>

                <label>EMAIL ADDRESS</label>
                <input
                  onChange={this.handleInput('email')}
                  type='text'
                  value={this.state.email}
                  placeholder='name@company.com'></input>

                <label>PASSWORD</label>
                <input
                  onChange={this.handleInput('password')}
                  type='password'
                  value={this.state.password}
                  placeholder='Password'></input>
                
                <div className='login-btn'>
                  <button onClick={this.handleSubmit}>LOG IN</button>
                </div>

                {errors}
              </form>
            </div>

            <div className='signup'>
              <p>Don't have an account?</p>
              <Link to='/signup' className='signup-link'>SIGN UP</Link>
            </div>

          </div>

        </div>
      </div>
    );
  }
}
