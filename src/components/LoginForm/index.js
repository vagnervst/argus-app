import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie'
import axios from 'axios'

import './style.scss'

import CookieWrapper from '../CookieWrapper'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.loginAction = this.loginAction.bind(this);
  }

  loginAction(e) {
    e.preventDefault();
    const { cookies } = this.props;
    const { user, pass } = e.target;

    axios.post('/supporter/login', {
      username: user.value,
      password: pass.value
    });
  }

  render() {

    return (
      <form id="login-form" onSubmit={this.loginAction}>
        <div className="input-box">
          <label for="user-input">User:</label>
          <input id="user-input" type="text" name="user" />
        </div>
        <div className="input-box">
          <label for="password-input">Password:</label>
          <input id="password-input" type="password" name="pass" />
        </div>
        <input type="submit" value="Login" />
      </form>
    )

  }

}

LoginForm.propTypes = {
  cookies: instanceOf(Cookies).isRequired
}

export default CookieWrapper(LoginForm)
