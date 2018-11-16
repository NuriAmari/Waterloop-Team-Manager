import React from 'react';
import Navbar from './general/Navbar';
import styled from 'styled-components';
import ResourceTabs from './general/ResourceTabs';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        }
    }

    render() {
        return (
            <Wrapper>
                <Navbar user={this.state.user}/>
                <div id='content'>
                    <div id='profile'>
                        <div id="fakeProfilePic">
                        </div>
                        <h3>User Name</h3>
                        <p>Web - Team Member</p>
                    </div>
                    <div id="resources">
                        <ResourceTabs/>
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


