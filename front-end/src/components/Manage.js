import React from 'react';
import Navbar from './general/Navbar';
import styled from 'styled-components';
import axios from 'axios';
 
class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }
    componentDidMount() {
        axios.get(`${process.env.BACK_END_URL}/user`).then((response) => {
            var newUser = {};
            for (var key in response.data) {
                if (!response.data.hasOwnProperty(key)) continue;
                newUser[key] = response.data[key];
            }
            this.setState({user: newUser});
        });
    }
    render() {
        return (
            <Wrapper>
                <Navbar user={this.state.user}/>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

`;


export default Manage;
