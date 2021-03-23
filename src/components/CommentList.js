import React from 'react';

const CommentList = ({ comments }) => {

  return(
    <ul>
      {comments.map((c, i) =>
        <li key={`${c}-${i}`}>
          { c }
        </li>
      )}
    </ul>
  )
}

export default CommentList;
