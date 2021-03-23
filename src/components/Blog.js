import React, { useState } from 'react';
import { addLike } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const Blog = ({ blog, deleteHandler }) => {
  const [ expanded, setExpanded ] = useState(false);

  console.log(blog);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`you liked '${blog.title}'`, 'success', 5));
  }

  const expandedContent = () => {
    return (
      <div>
        <p>{ blog.title } { blog.author } <button onClick={ () => setExpanded(false) }>{ expanded ? 'hide' : 'view' }</button></p>
        <p>{ blog.url }</p>
        <p>likes: { blog.likes } <button onClick={ () => like() }>like</button></p>
        <p>{ blog.user.name }</p>
        { user.name === blog.user.name && <button onClick={ () => deleteHandler() }>remove</button> }
      </div>
    )
  }

  const minContent = () => {
    return (
      <div>
        { blog.title } { blog.author } <button onClick={ () => setExpanded(true) }>view</button>
      </div>
    )
  }

  return (
    <div className="blog">
      { expanded ? expandedContent() : minContent() }
    </div>
  )
}

export default Blog
