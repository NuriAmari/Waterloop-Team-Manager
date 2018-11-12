import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        );
    }
}

    /*const auth = {
    isAuthenticated: false,
    authenticate(username, password, callback) {
        
                    <PrivateRoute path="/dashboard" component={Dashboard} />
    },
    signout(callback) {

    }
};*/


var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);

// I have no idea what this does
if (module.hot) {
    module.hot.accept();
}
