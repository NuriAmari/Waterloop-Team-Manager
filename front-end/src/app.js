import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "Chris"};
    }
    
    componentWillMount() {
        console.log("Component Will Mount");
        axios.get("http://127.0.0.1:4000/name").then((response) => {
            console.log(response);
            this.setState({name: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }
        
    render() {
        return <div>Hello {this.state.name}</div>;
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Muthu" />, mountNode);
