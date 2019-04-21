import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'PLACECREATE',
  'PLACEUPDATE',
  'PLACEDELETE',
  'PERMISSIONUPDATE'
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      firstName
      lastName
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <>
        <Error error={error} />

        <h2>Manage Permissions</h2>
        <div className="users-wrapper">
          <div className="user-title">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            {possiblePermissions.map(permission => (
              <div key={permission}>{permission}</div>
            ))}
            <div>🔘</div>
          </div>
          {data.users.map(user => (
            <UserPermissions user={user} key={user.id} />
          ))}
        </div>
      </>
    )}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };
  handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    this.setState({ permissions: updatedPermissions });
  };
  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <div>
                <Error error={error} />
              </div>
            )}

            <div className="user-info">
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.email}</div>
              {possiblePermissions.map(permission => (
                <div key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </div>
              ))}
              <div>
                <button disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? 'ing' : 'e'}
                </button>
              </div>
            </div>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
