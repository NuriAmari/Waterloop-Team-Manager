import React from 'react';
import Navbar from './general/Navbar';
import styled from 'styled-components';
import ResourceTabs from './general/ResourceTabs';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                team: '',
            },
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
                <div id='content'>
                    <div id='profile'>
                        <div id="fakeProfilePic">
                        </div>
                        <h3>{`${this.state.user.firstname} ${this.state.user.lastname}`}</h3>
                        { this.state.user.team &&
                                <p>{(this.state.user.role ? this.state.user.role + " - ": '') + this.state.user.team}</p>
                        }
                    </div>
                    <div id="resources">
                        <ResourceTabs user={this.state.user}/>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

    width: 100%;
    height 100%;

    #content {
        margin-top: 30px;
        display: grid;
        grid-gap: 20px;
        width: 80%;
        margin: 20px auto;
        grid-template-columns: 1fr 3fr;
    }

    #fakeProfilePic {
        width: 100%;
        height: 180px;
        background-color: gray;
        margin-bottom: 20px;
    }
`;

export default Dashboard;


