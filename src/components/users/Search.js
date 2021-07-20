import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const { setAlert } = useContext(AlertContext);
  const { searchUsers, showClearUsers, clearUsers } = useContext(GithubContext);
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input className='' type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange}></input>
        <input className='btn btn-dark btn-block' type='submit' value='Search' placeholder='Search Users...'></input>
      </form>
      {showClearUsers && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
