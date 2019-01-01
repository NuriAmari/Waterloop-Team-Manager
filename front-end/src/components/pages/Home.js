import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../general/Navigation';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Navigation checkPermission={this.props.checkPermission} adminStatus={true}/>
            </div>
        );
    }
}

export default Home;
