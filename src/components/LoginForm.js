import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = React.forwardRef((props, ref) => {

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={ props.handleLogin }>
        <div>
          username
          <input
            type="text"
            value={ props.username }
            name="Username"
            onChange={ props.handleUsernameChange }
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={ props.password }
            name="Password"
            onChange={ props.handlePasswordChange }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
});

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm;
