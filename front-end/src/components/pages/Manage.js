import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../general/Navigation';
import UserList from '../general/UserList';

class Manage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Wrapper>
                <UserList
                    users={[{ name: 'John', id: 1 }, { name: 'Admin', id: 2 }]}
                />
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    width: 80%;
    margin: 10vw auto;
`;

export default Manage;
