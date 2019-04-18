import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class Signin extends Component {
  state = {
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="signin-form">
        <h2>Request a Password Reset</h2>
        <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
          {(reset, { error, loading, called }) => (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await reset();
                this.setState({ email: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>
                    Request sent! Check your email for a link to reset your
                    password.
                  </p>
                )}
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />

                <button type="submit" className={loading ? 'loading' : null}>
                  Reset Password
                </button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Signin;
