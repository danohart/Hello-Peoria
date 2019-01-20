import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $firstName: String!,
        $lastName: String!,
        $password: String!
    ) {
        signup(
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            password: $password
        ) {
            id
            email
            firstName
            lastName
        }
    }
`;

class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value})
    } 

    render() {
        return (
            <div className="signup-form">
                <h2>Register</h2>
                <Mutation mutation={SIGNUP_MUTATION} variables={this.state} refetchQueries={[
                    {query: CURRENT_USER_QUERY}
                ]}>
                 {(signup, {error, loading}) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await signup();
                        this.setState({name: '', email: '', password: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Error error={error} />
                            <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.saveToState} />
                            <input type='text' name='firstName' placeholder='First Name' value={this.state.firstName} onChange={this.saveToState} />
                            <input type='text' name='lastName' placeholder='Last Name' value={this.state.lastName} onChange={this.saveToState} />
                            <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.saveToState} />
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                 )}
                </Mutation>
            </div>
        );
    }
}

export default Signup;