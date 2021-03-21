import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ notificationClass, setNotificationClass ] = useState('error');

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
      setNotificationMessage('wrong username or password');
      setNotificationClass('error');
    }

    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }

  const likeBlog = async (blog) => {
    const updateBlog = {...blog, likes: blog.likes + 1 };

    try{
      const updateResponse = await blogService.updateBlog(updateBlog);
      setBlogs(blogs.map(b => b.id === updateBlog.id ? updateBlog : b));
    }catch(exception){
      console.log(exception);
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
      setBlogs(blogs.concat(createResponse));

      setNotificationMessage(`a new blog ${createResponse.title} by ${createResponse.author} added`);
      setNotificationClass('success');
    }catch(exception) {
      setNotificationMessage('An error occurred while creating this blog');
      setNotificationClass('error');
    }

    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }

  const handleLogout = () => {
    setUser(null);
    blogService.setToken('');
    window.localStorage.removeItem('blog-user');
  }

  const loggedInContent = () => {
    return (
      <div>
        <h2>Hello, { user.name }<button onClick={ handleLogout }>logout</button></h2>
        <Togglable buttonLabel='create'>
          <BlogForm
            onSubmit={ createBlog }
            handleTitleChange = { ({ target }) => setTitle(target.value) }
            handleAuthorChange = { ({ target }) => setAuthor(target.value) }
            handleUrlChange = { ({ target }) => setUrl(target.value) }
            titleValue = { title }
            authorValue = { author }
            urlValue = { url }
          />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={ blog.id }
            blog={ blog }
            likeHandler={ () => likeBlog(blog) }
          />
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
      <Notification
        message={ notificationMessage }
        className={ notificationClass }
      />
      { user === null && loginForm() }
      { user !== null && loggedInContent() }
    </div>
  )
}

export default App
