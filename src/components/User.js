import React, { useState, useEffect } from 'react';
import userService from '../services/users';

const User = ({ id }) => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await userService.getUserBlogs(id);
      setUser(response);
    }
    getUser();
  }, [id]);

  if(user)
  {
    return (
      <div>
        <h1>{ user.name }</h1>
        <h2>added blogs</h2>
        <ul>
          { user.blogs.length > 0 ? user.blogs.map(blog => {
              return (
                <li key={ blog.id }>
                  { blog.title }
                </li>
              )
            })
            :
            <p>No blogs</p>
          }
        </ul>
      </div>
    )
  }else
  {
    return (
      <h2>Loading user blogs..</h2>
    )
  }
}

export default User;
