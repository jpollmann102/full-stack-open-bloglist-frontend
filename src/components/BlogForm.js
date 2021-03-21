import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = React.forwardRef((props, ref) => {
  return (
    <div className="blogForm">
      <h2>create new</h2>
      <form onSubmit={ props.onSubmit }>
        <div>
          title
          <input
            type="text"
            value={ props.titleValue }
            name="Title"
            onChange={ props.handleTitleChange }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={ props.authorValue }
            name="Author"
            onChange={ props.handleAuthorChange }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={ props.urlValue }
            name="Url"
            onChange={ props.handleUrlChange }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
});

BlogForm.propTypes = {
  titleValue: PropTypes.string.isRequired,
  authorValue: PropTypes.string.isRequired,
  urlValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm;
