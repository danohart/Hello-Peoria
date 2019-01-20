import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!,
        $password: String!
    ) {
        signin(
            email: $email,
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    state = {
        name: '',
        password: '',
        email: '',
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value})
    } 

    render() {
        return (
            <div className="signin-form">
                <h2>Sign In</h2>
                <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[
                    { query: CURRENT_USER_QUERY}
                ]}>
                 {(signup, {error, loading}) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await signup();
                        this.setState({ email: '', password: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Error error={error} />
                            <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.saveToState} />
                            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.saveToState} />
                            <button type="submit" className={loading ? 'loading' : null}>Sign In</button>
                        </fieldset>
                    </form>
                 )}
                </Mutation>
            </div>
        );
    }
}

export default Signin;