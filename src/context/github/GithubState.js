import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING } from '../types';

let githubClientId, githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const githubBaseUrl = `https://api.github.com`;
const clientAuth = `client_id=${githubClientId}&client_secret=${githubClientSecret}`;

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Set Loading
  const setLoading = () => {
    return dispatch({ type: SET_LOADING });
  };

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const url = `${githubBaseUrl}/search/users?q=${text}&${clientAuth}`;
    const res = await axios.get(url);
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Show Clear User
  const showClearUsers = () => (state.users.length > 0 ? true : false);

  // Get User
  const getUser = async (username) => {
    setLoading();
    const url = `${githubBaseUrl}/users/${username}?${clientAuth}`;
    const res = await axios.get(url);
    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();
    const url = `${githubBaseUrl}/users/${username}/repos?per_page=5&sort=created:asc&${clientAuth}`;
    const res = await axios.get(url);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        showClearUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
