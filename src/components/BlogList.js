import React from 'react';
import Blog from './Blog';
import { removeBlog } from '../reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  const deleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
    {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(setNotification(`blog '${blog.title}' removed`, 'success', 5));
      }catch(exception) {
        dispatch(setNotification(`something went wrong while deleting - ${exception}`, 'error', 5));
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={ blog.id }
          blog={ blog }
          deleteHandler={ () => deleteBlog(blog) }
        />
      )}
    </div>
  )
}

export default BlogList;
