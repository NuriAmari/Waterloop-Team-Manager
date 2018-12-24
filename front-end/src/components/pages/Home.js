import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../general/Navigation';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation adminsStatus="true"/>
            </div>
        );
    }
}

export default Home;
