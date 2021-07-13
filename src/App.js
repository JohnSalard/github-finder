import { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//Layout
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

//Users
import User from './components/users/User';
import Users from './components/users/Users';
import Search from './components/users/Search';

//Pages
import About from './components/pages/About';

const githubUrl = `https://api.github.com`;
// const clientAuth = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const clientAuth = ``;

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  //Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const url = `${githubUrl}/search/users?q=${text}&${clientAuth}`;
    const res = await axios.get(url);
    this.setState({ users: res.data.items, loading: false });
  };

  //Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const url = `${githubUrl}/users/${username}?${clientAuth}`;
    const res = await axios.get(url);
    this.setState({ user: res.data, loading: false });
  };

  //Get user repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const url = `${githubUrl}/users/${username}/repos?per_page=5&sort=created:asc&${clientAuth}`;
    const res = await axios.get(url);
    this.setState({ repos: res.data, loading: false });
  };

  //Clear user state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //Show user from state length
  showClearUsers = () => {
    if (this.state.users.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { user, users, repos, loading, alert } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearUsers={this.showClearUsers()}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
