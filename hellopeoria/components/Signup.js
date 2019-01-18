import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage'

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!,
        $name: String!,
        $password: String!
    ) {
        signup(
            email: $email,
            name: $name,
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {
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
            <div className="signup-form">
                <h2>Register</h2>
                <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
                 {(signup, {error, loading}) => (
                    <form method="post" onSubmit={async e => {
                        e.preventDefault();
                        const res = await signup();
                        this.setState({name: '', email: '', password: ''});
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Error error={error} />
                            <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.saveToState} />
                            <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.saveToState} />
                            <input type='text' name='password' placeholder='Password' value={this.state.password} onChange={this.saveToState} />
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