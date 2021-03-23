import React from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const MainView = () => {
  return (
    <div>
      <Togglable buttonLabel='create'>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default MainView;
