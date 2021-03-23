import React from 'react';
import Button from 'react-bootstrap/Button';
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
      <Button variant="outline-primary" size="sm" onClick={ () => dispatch(logout()) }>logout</Button>
    </nav>
  )
}

export default Navbar;
