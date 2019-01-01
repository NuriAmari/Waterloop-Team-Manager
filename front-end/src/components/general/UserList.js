import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
        };
    }

    render() {
        return (
            <ListGroup>
                {this.state.users.map(({ name, id }) => (
                    <ListGroupItem key={id} className="justify-content-between">
                        {name}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

export default UserList;
