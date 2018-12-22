import React from 'react';
import Navbar from './general/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import UserList from './general/UserList';

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            users: [],
        }
    }
    componentDidMount() {
        axios.get(`${process.env.BACK_END_URL}/user`).then((response) => {
            var newUser = {};
            for (var key in response.data) {
                if (!response.data.hasOwnProperty(key)) continue;
                newUser[key] = response.data[key];
            }
            this.setState((prevState) => ({...prevState, user: newUser}));
        });
        axios.get(`${process.env.BACK_END_URL}/allUsers`).then((response) => {
            this.setState((prevState, props) => ({...prevState, users: response.data})); 
        });
    }

    render() {
        return (
            <Wrapper>
                <Navbar user={this.state.user}/>
                <UserList data={this.state.users}/>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    UserList {
       width: 80vw;
       margin: auto;
       margin-top: 10vw;
    }
`;


export default Manage;
