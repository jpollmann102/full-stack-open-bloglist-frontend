import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { useResettableField } from '../hooks/index';
import { setNotification } from '../reducers/notificationReducer';

const CommentForm = ({ id }) => {
  const commentField = useResettableField('text', 'comment');

  const dispatch = useDispatch();

  const submitComment = (event) => {
    event.preventDefault();

    try{
      dispatch(addComment(id, commentField.field.value));
      commentField.reset();
    }catch(exception){
      dispatch(setNotification('something went wrong', 'error', 5));
    }
  }

  return (
    <form onSubmit={ submitComment }>
      <div>
        <input {...commentField.field}/>
      </div>
      <Button variant="primary" type="submit">add comment</Button>
    </form>
  )
}

export default CommentForm;
