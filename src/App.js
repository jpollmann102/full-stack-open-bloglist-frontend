import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const userResponse = await loginService.login(username, password);
      setUser(userResponse);
      setUsername('');
      setPassword('');
    }catch(exception) {
      window.alert('Incorrect username or password');
    }
  }

  const loggedInContent = () => {
    return (
      <div>
        <h2>Hello, { user.name }</h2>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>login</h2>
        <form onSubmit={ handleLogin }>
          <div>
            username
            <input
              type="text"
              value={ username }
              name="Username"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={ password }
              name="Password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      { user === null && loginForm() }
      { user !== null && loggedInContent() }
    </div>
  )
}

export default App
