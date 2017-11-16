import React from 'react';
import { Link } from 'react-router-dom';

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

  componentDidMount(){
    this.props.clearSessionErrors();
  }

  handleInput(type){
    return (event) => this.setState( { [type]: event.target.value } );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.signup({ user: this.state });
  }

  render(){
    const sessionErrors = this.props.errors.session;
    let errors;
    if (sessionErrors.length > 0){
      errors = sessionErrors.map((error, i) => (
        <li key={i}>{error}</li>
      ));
      errors = <ul>{errors}</ul>;
    }

    return (
      <div id='signup-auth'>
        <div className='signup-content'>

          <div className='signup-wrapper'>

            <div className='front-display'>

              <div className='logo'>
                <img src='https://res.cloudinary.com/dcl72qrya/image/upload/v1505802948/full_logo_full_yfxljp.png'/>
              </div>

            </div>

            <div className='signup-elements'>
              <div  className='signup-form'>
                <form>
                  <h2>Sign Up</h2>

                  <label>NAME</label>
                  <input
                    onChange={this.handleInput('name')}
                    type='text'
                    placeholder='Your Name'
                    value={this.state.name}></input>

                  <label>EMAIL ADDRESS</label>
                  <input
                    onChange={this.handleInput('email')}
                    type='text'
                    placeholder='name@company.com'
                    value={this.state.email}></input>

                  <label>PASSWORD</label>
                  <input
                    onChange={this.handleInput('password')}
                    type='password'
                    placeholder='Password'
                    value={this.state.password}></input>

                  <div className='signup-btn'>
                    { errors }
                    <button onClick={this.handleSubmit}>SIGN UP</button>
                  </div>


                </form>
              </div>
              <div className='login'>
                <p>Already have an account?</p>
                <Link to='/login' className='login-link'>LOG IN</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
