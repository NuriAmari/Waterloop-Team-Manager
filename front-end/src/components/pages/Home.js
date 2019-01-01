import React from 'react';
import axios from 'axios';
import Navigation from '../general/Navigation';
import styled from 'styled-components';
import ResourceCard from '../general/ResourceCard';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <Resources>
                <ResourceCard title="Github" />
                <ResourceCard title="Drive" />
                <ResourceCard title="Overleaf" />
                <ResourceCard title="Slack" />
            </Resources>
        );
    }
}

const Resources = styled.div`
    display: grid;
    width: 80%;
    margin: 10vw auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
`;

export default Home;
