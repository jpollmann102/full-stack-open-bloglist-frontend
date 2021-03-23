import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useResettableField } from '../hooks/index';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const usernameField = useResettableField('text', 'username');
  const passwordField = useResettableField('password', 'password');

  const dispatch = useDispatch();

  const loginClicked = (event) => {
    event.preventDefault();

    try{
      dispatch(login(usernameField.field.value, passwordField.field.value));
      resetFields();
    }catch(exception)
    {
      dispatch(setNotification('wrong username or password', 'error', 5));
    }

  }

  const resetFields = () => {
    usernameField.reset();
    passwordField.reset();
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={ loginClicked }>
        <div>
          username
          <input {...usernameField.field}/>
        </div>
        <div>
          password
          <input {...passwordField.field}/>
        </div>
        <Button variant="outline-primary" size="sm" type="submit">login</Button>
      </form>
    </div>
  )
};

export default LoginForm;
