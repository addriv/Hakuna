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
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
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

  handleDemoLogin(event){
    event.preventDefault();

    let i = 0;
    setInterval(() => {

    }, 500);


    const demoAcc = {
      user: {
        email: 'demo@email.com',
        password: 'demo333'
      }};

    this.props.login(demoAcc);
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


          <div className='login-wrapper'>

            <div className='front-display'>
              <div className='logo'>
                <img src='http://res.cloudinary.com/dcl72qrya/image/upload/v1505801236/full_logo_medium_q8xov2.png'/>
              </div>
            </div>

            <div className='login-form'>
              <form>
                <h2>Log In</h2>

                <label>EMAIL ADDRESS</label>
                <input
                  onChange={this.handleInput('email')}
                  type='text'
                  class='input-email'
                  value={this.state.email}
                  placeholder='name@company.com'></input>

                <label>PASSWORD</label>
                <input
                  onChange={this.handleInput('password')}
                  type='password'
                  class='input-password'
                  value={this.state.password}
                  placeholder='Password'></input>

                <div className='login-form-buttons'>
                  {errors}

                  <button onClick={this.handleSubmit}>LOG IN</button>
                  <button onClick={this.handleDemoLogin}>DEMO</button>
                </div>

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
