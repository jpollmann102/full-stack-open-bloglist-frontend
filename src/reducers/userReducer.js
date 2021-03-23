import loginService from '../services/login';
import blogService from '../services/blogs';

export const login = (username, password) => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem('blog-user');
    if(userJSON)
    {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      dispatch({
        type: 'LOGIN_USER',
        data: user
      });
    }else
    {
      const userResponse = await loginService.login(username, password);
      blogService.setToken(userResponse.token);
      window.localStorage.setItem('blog-user', JSON.stringify(userResponse));
      dispatch({
        type: 'LOGIN_USER',
        data: userResponse
      });
    }
  }
}

export const logout = () => {
  blogService.setToken('');
  window.localStorage.removeItem('blog-user');
  return {
    type: 'LOGOUT_USER'
  }
}

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case('LOGIN_USER'):
      if(action.data)
      {
        return action.data;
      }else return state;
    case('LOGOUT_USER'):
      return null
    default: return state;
  }
}

export default userReducer;
