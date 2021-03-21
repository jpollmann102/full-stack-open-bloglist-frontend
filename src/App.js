import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blog-user');
    if(userJSON)
    {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const userResponse = await loginService.login(username, password);
      setUser(userResponse);
      setUsername('');
      setPassword('');

      window.localStorage.setItem('blog-user', JSON.stringify(userResponse));
      blogService.setToken(userResponse.token);
    }catch(exception) {
      console.log(exception);
      window.alert('Incorrect username or password');
    }
  }

  const createBlog = async (event) => {
    event.preventDefault();

    const newNote = {
      title,
      author,
      url
    };

    try {
      const createResponse = await blogService.createBlog(newNote);
      setBlogs(blogs.concat(createResponse))
    }catch(exception) {
      console.log(exception);
    }
  }

  const createBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={ createBlog }>
          <div>
            title
            <input
              type="text"
              value={ title }
              name="Title"
              onChange={ ({ target }) => setTitle(target.value) }
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={ author }
              name="Author"
              onChange={ ({ target }) => setAuthor(target.value) }
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={ url }
              name="Url"
              onChange={ ({ target }) => setUrl(target.value) }
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const handleLogout = () => {
    setUser(null);
    blogService.setToken('');
    window.localStorage.removeItem('blog-user');
  }

  const loggedInContent = () => {
    return (
      <div>
        <h2>Hello, { user.name }</h2>
        { true && createBlogForm() }
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <button onClick={ handleLogout }>logout</button>
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
