import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { login, logout } from './reducers/userReducer';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(() => dispatch(login()), []);

  useEffect(() => {
    if(user)
    {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  const loggedInContent = () => {
    return (
      <div>
        <h2>Hello, { user.name }<button onClick={ () => dispatch(logout()) }>logout</button></h2>
        <Togglable buttonLabel='create'>
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      { user === null
        &&
        <LoginForm />
      }
      { user !== null && loggedInContent() }
    </div>
  )
}

export default App
