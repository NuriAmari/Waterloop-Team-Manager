import React from 'react';
import Navbar from './general/Navbar';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        }
    }

    render() {
        return (
            <Navbar user={this.state.user}/>
        );
    }
}

export default Dashboard;


