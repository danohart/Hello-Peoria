import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { ALL_PLACES_QUERY } from './Places';

const SINGLE_PLACE_QUERY = gql`
    query SINGLE_PLACE_QUERY($id: ID!) {
        place(where: { id: $id}) {
            id
            name
            description
            category
            address
        }
    }
`;

const UPDATE_PLACE_MUTATION = gql`
    mutation UPDATE_PLACE_MUTATION (
            $id: ID!
            $name: String
            $address: String
            $description: String
            $category: String
            
        ) {
            updatePlace(
                id: $id
                name: $name
                description: $description
                address: $address
                category: $category
                
            ) {
                id
                name
                description
                address
                category
            }
        
    }
`;

class updatePlace extends Component {
    state = {
    }

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    }

    // uploadFile = async e => {
    //     console.log('Uploading file...');
    //     const files = e.target.files;
    //     const data = new FormData();
    //     data.append('file', files[0]);
    //     data.append('upload_preset', 'hellopeoria');

    //     const res = await fetch ('https://api.cloudinary.com/v1_1/danielhart/image/upload', {
    //         method: 'POST',
    //         body: data
    //     });

    //     const file = await res.json();
    //     console.log('file:', file);
    //     this.setState({
    //         image: file.secure_url,
    //         largeImage: file.eager[0].secure_url
    //     })
    // };

    updatePlace = async (e, updatPlaceMutation) => {
        e.preventDefault();
        const res = await updatPlaceMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        })
    }

    render() {
        return (
            <Query query={SINGLE_PLACE_QUERY} variables={{
                id: this.props.id
            }}>
                {({data, loading}) => {
                    if(loading) return <p>Loading...</p>
                    if(!data.place) return <p>No information found for this. Please go back and try again.</p>
                    return (
                        
                    <Mutation mutation={UPDATE_PLACE_MUTATION} variables={this.state}>
                        {(updatePlace, { loading, error, }) => (
                            <form onSubmit={e => this.updatePlace(e, updatePlace)}>
                                <h2>Update a Place</h2>
                                <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading} className="upload-form">
                                    <input type="text" id="name" name="name" placeholder="Name" required defaultValue={data.place.name} onChange={this.handleChange} />

                                    <input type="text" id="address" name="address" placeholder="Address" required defaultValue={data.place.address}  onChange={this.handleChange}/>

                                    <input type="text" id="description" name="description" placeholder="Description" required defaultValue={data.place.description} onChange={this.handleChange} />

                                    {/* <input type="file" id="file" name="file" placeholder="Upload an image" required onChange={this.uploadFile} />
                                    {this.state.image ? <img src={this.state.image} alt="Upload image preview" /> : <img src='http://via.placeholder.com/150x150?text=Upload'/>} */}

                                    <input type="text" id="category" name="category" placeholder="Category(one word)"
                                    defaultValue={data.place.category}
                                    onChange={this.handleChange} />
                                    
                                    <br/>
                                    <button type="submit">Update Changes</button>
                                </fieldset>
                            </form>
                            )
                        }
                    </Mutation>

                )
            }}
            </Query>
        );
    }
}

export default updatePlace;
export { UPDATE_PLACE_MUTATION };