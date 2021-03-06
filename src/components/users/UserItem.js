import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className='card text-center'>
      <img className='round-img' src={avatar_url} alt={login} style={{ width: '60px' }} />
      <h3>{login}</h3>
      <div>
        <Link className='btn btn-dark btn-sm my-1' to={`/user/${login}`}>
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.prototype = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
