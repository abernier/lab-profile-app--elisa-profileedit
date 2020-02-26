import React from "react";

export default class ProfileEdit extends React.Component {
  // initialize states with props.user values (if any) / otherwise ""
  state = {
    firstname: this.props.user.firstname || "",
    lastname: this.props.user.lastname || ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    // update the App's user with the form's values
    this.props.setUser(this.state);

    this.props.history.push("/"); // redirect to home
  };

  componentDidUpdate(prevProps) {
    // just-after any re-render (when any prop/state has changed)

    // but ONLY if that re-render was caused by a `props.user` change:
    if (prevProps.user._id !== this.props.user._id) {
      console.log("user has changed => let's update our form states");

      // update our form states (with new props.user values):
      this.setState({
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname
      });
    }
  }

  render() {
    const disabled = !this.props.user._id; // true until user._id is something

    return (
      <>
        <h1>✏️ Edit</h1>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset disabled={disabled}>
            {/* loader */}
            {disabled && <p>⏳ Loading...</p>}

            {/* firstname field */}
            <p>
              <label>
                Firstname:
                <input
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </label>
            </p>

            {/* lastname field */}
            <p>
              <label>
                Lastname:
                <input
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </label>
            </p>

            <button>Save</button>
          </fieldset>
        </form>
      </>
    );
  }
}
