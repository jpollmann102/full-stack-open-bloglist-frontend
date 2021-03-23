import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <nav style={{ background: 'gainsboro', padding: '10px' }}>
      <Link to={'/'} style={{ marginRight: '15px' }}>
        blogs
      </Link>
      <Link to={'/users'} style={{ marginRight: '15px' }}>
        users
      </Link>
      { user.name } logged in
      <button style={{ marginLeft: '5px' }}onClick={ () => dispatch(logout()) }>logout</button>
    </nav>
  )
}

export default Navbar;
