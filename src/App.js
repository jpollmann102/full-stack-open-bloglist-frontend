import React, { useEffect } from 'react';
import Blog from './components/Blog';
import User from './components/User';
import MainView from './components/MainView';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { login, logout } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const userRouteMatch = useRouteMatch('/users/:id');
  const blogsRouteMatch = useRouteMatch('/blogs/:id');

  useEffect(() => dispatch(login()), []);

  useEffect(() => {
    if(user)
    {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  const userMatchedRoute = () => {
    if(userRouteMatch)
    {
      return userRouteMatch.params.id;
    }else return undefined;
  }

  const blogsMatchedRoute = () => {
    if(blogsRouteMatch)
    {
      return blogsRouteMatch.params.id;
    }else return undefined;
  }

  const loggedInContent = () => {
    return (
      <div>
        <h1>blogs</h1>
        <h2>Hello, { user.name }</h2>
        <button onClick={ () => dispatch(logout()) }>logout</button>
        <Switch>
          <Route path="/users/:id">
            <User id={ userMatchedRoute() }/>
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            <Blog id={ blogsMatchedRoute() }/>
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
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
