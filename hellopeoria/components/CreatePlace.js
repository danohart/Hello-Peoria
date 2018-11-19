import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'
import Error from './ErrorMessage'

const CREATE_PLACE_MUTATION = gql`
    mutation CREATE_PLACE_MUTATION (
            $name: String!
            $address: String!
            $description: String!
        ) {
            createPlace(
                name: $name
                description: $description
                address: $address
            ) {
                id
                name
                description
                address
            }
        
    }
`;

class createPlace extends Component {
    state = {
        name: 'Default Name',
        address: '500 Main St.',
        description: 'This is a description of your place or venue',
        image: 'image.jpg',
    }

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    }

    render() {
        return (
            <Mutation mutation={CREATE_PLACE_MUTATION} variables={this.state}>
                {(createPlace, { loading, error, }) => (
                    <form onSubmit={ async (e) => {
                        // Stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await createPlace();

                        console.log(res);
                        // Direct to Place URL
                        Router.push({
                            pathname: '/places',
                            query: { id: res.data.createPlace.id}
                        })
                    }}>
                        <h2>Add a Place</h2>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <input type="text" id="name" name="name" placeholder="Name" required value={this.state.name} onChange={this.handleChange} />

                            <input type="text" id="address" name="address" placeholder="Address" required value={this.state.address}  onChange={this.handleChange}/>

                            <input type="text" id="description" name="description" placeholder="Description" required value={this.state.description} onChange={this.handleChange} />

                            <input type="text" id="image" name="image" placeholder="Image" required value={this.state.image} onChange={this.handleChange} />
                            
                            <br/>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                    )
                }
            </Mutation>
        );
    }
}

export default createPlace;
export { CREATE_PLACE_MUTATION };