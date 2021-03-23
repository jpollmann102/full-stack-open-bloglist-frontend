import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await userService.getAllUserBlogs();
      setUsers(response);
    }
    getBlogs();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          { users.map(user => {
              return (
                <tr key={ user.id }>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      { user.name }
                    </Link>
                  </td>
                  <td>{ user.blogs.length }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
