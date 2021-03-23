import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useResettableField } from '../hooks/index';
import { addBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
  const titleInput = useResettableField('text', 'title');
  const authorInput = useResettableField('text', 'author');
  const urlInput = useResettableField('text', 'url');

  const createBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: titleInput.field.value,
      author: authorInput.field.value,
      url: urlInput.field.value
    };

    try{
      dispatch(addBlog(newBlog));
      dispatch(setNotification(`you created a new blog '${newBlog.title}'`, 'success', 5));
      resetFields();
    }catch(exception)
    {
      dispatch(setNotification('something went wrong while creating blog', 'error', 5));
    }
  }

  const resetFields = () => {
    titleInput.reset();
    authorInput.reset();
    urlInput.reset();
  }

  return (
    <div className="blogForm">
      <h2>create new</h2>
      <form onSubmit={ createBlog }>
        <div>
          title
          <input {...titleInput.field} />
        </div>
        <div>
          author
          <input {...authorInput.field} />
        </div>
        <div>
          url
          <input {...urlInput.field} />
        </div>
        <Button variant="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm;
