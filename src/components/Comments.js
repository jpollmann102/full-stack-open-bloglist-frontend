import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Comments = ({ blog }) => {

  return (
    <div>
      <h2>comments</h2>
      <CommentForm id={ blog.id }/>
      <CommentList comments={ blog.comments } />
    </div>
  )
}

export default Comments;
