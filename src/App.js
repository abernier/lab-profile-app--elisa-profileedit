import React from "react";

import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import sleeper from "./sleeper.js";

import Homepage from "./Homepage.js";
import ProfileEdit from "./ProfileEdit.js";

export default class App extends React.Component {
  state = {
    user: {}
  };

  fetchUser = () => {
    axios
      .get("/user.json")
      .then(response => response.data)
      .then(sleeper(2000))
      .then(this.setUser)
      .catch(err => console.log(err));
  };

  setUser = user => {
    // merge old user value with new one into a brand new object
    this.setState({ user: { ...this.state.user, ...user } });
  };

  componentDidMount() {
    this.fetchUser(); // initially fetch user
  }

  render() {
    return (
      <div className="App">
        {/* Nav bar */}
        <nav>
          <p>
            <Link to="/">Home</Link> - <Link to="/profile/edit">Edit</Link>
          </p>
        </nav>

        {/*
        Routes:
          - HOME: /
          - PROFILE: /profile/edit
        */}

        <Switch>
          <Route
            exact
            path="/"
            render={props => <Homepage user={this.state.user} />}
          />
          <Route
            path="/profile/edit"
            render={props => (
              <ProfileEdit
                {...props}
                user={this.state.user} // pass the user state
                setUser={this.setUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
