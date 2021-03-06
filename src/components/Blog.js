import React from 'react';
import Comments from './Comments';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { addLike } from '../reducers/blogReducer';
import { removeBlog } from '../reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ id }) => {

  const user = useSelector(state => state.user);
  const blog = useSelector(state => state.blogs.find(b => b.id === id));
  const dispatch = useDispatch();
  const history = useHistory();

  const like = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`you liked '${blog.title}'`, 'success', 5));
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
    {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(setNotification(`blog '${blog.title}' removed`, 'success', 5));
        history.push("/");
      }catch(exception) {
        dispatch(setNotification(`something went wrong while deleting - ${exception}`, 'error', 5));
      }
    }
  }

  if(blog)
  {
    return (
      <div>
        <h1>{ blog.title } { blog.author }</h1>
        <a href={ blog.url }>{ blog.url }</a>
        <p>likes: { blog.likes } <Button variant="primary" onClick={ () => like() }>like</Button></p>
        <p>added by { blog.user.name }</p>
        { user.name === blog.user.name && <Button variant="primary" onClick={ () => deleteBlog() }>remove</Button> }
        <Comments blog={ blog }/>
      </div>
    )
  }else
  {
    return <p>Loading blog...</p>
  }
}

export default Blog
