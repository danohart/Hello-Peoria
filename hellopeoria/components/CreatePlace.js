import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { ALL_PLACES_QUERY } from './Places';

const CREATE_PLACE_MUTATION = gql`
    mutation CREATE_PLACE_MUTATION (
            $name: String!
            $address: String!
            $description: String!
            $category: String
            $image: String
            $largeImage: String
        ) {
            createPlace(
                name: $name
                description: $description
                address: $address
                category: $category
                image: $image
                largeImage: $largeImage
            ) {
                id
                name
                description
                address
                category
                image
                largeImage
            }
        
    }
`;

class createPlace extends Component {
    state = {
        name: '',
        address: '',
        description: '',
        image: '',
        largeImage: '',
        category: '',
    }

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    }

    uploadFile = async e => {
        console.log('Uploading file...');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'hellopeoria');

        const res = await fetch ('https://api.cloudinary.com/v1_1/danielhart/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();
        console.log('file:', file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    };

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
                        <fieldset disabled={loading} aria-busy={loading} className="upload-form">
                            <input type="text" id="name" name="name" placeholder="Name" required value={this.state.name} onChange={this.handleChange} />

                            <input type="text" id="address" name="address" placeholder="Address" required value={this.state.address}  onChange={this.handleChange}/>

                            <input type="text" id="description" name="description" placeholder="Description" required value={this.state.description} onChange={this.handleChange} />

                            <input type="file" id="file" name="file" placeholder="Upload an image" required onChange={this.uploadFile} />
                            {this.state.image ? <img src={this.state.image} alt="Upload image preview" /> : <img src='http://via.placeholder.com/150x150?text=Upload'/>}

                            <input type="text" id="category" name="category" placeholder="Category(one word)"
                            value={this.state.category}
                            onChange={this.handleChange} />
                            
                            <br/>
                            <button type="submit" className={loading ? 'loading' : null}>Submit</button>
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