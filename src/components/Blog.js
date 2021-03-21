import React, { useState } from 'react';

const Blog = ({ blog, likeHandler }) => {
  const [ expanded, setExpanded ] = useState(false);

  const expandedContent = () => {
    return (
      <div>
        <p>{ blog.title } { blog.author } <button onClick={ () => setExpanded(false) }>{ expanded ? 'hide' : 'view' }</button></p>
        <p>{ blog.url }</p>
        <p>likes: { blog.likes } <button onClick={ likeHandler }>like</button></p>
        <p>{ blog.user.name }</p>
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
