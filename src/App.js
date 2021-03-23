import React, { useEffect } from 'react';
import UserList from './components/UserList';
import User from './components/User';
import MainView from './components/MainView';
import { login, logout } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Notification from './components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const routeMatch = useRouteMatch('/users/:id');

  useEffect(() => dispatch(login()), []);

  useEffect(() => {
    if(user)
    {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  const matchedRoute = () => {
    if(routeMatch)
    {
      return routeMatch.params.id;
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
            <User id={ matchedRoute() }/>
          </Route>
          <Route path="/users">
            <UserList />
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
