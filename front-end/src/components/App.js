import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import RequireAuth from './general/RequireAuth';
import SignUp from './pages/SignUp';
import Manage from './pages/Manage';

axios.defaults.withCredentials = true;

class App extends React.Component {
    isMounted = false;

    constructor(props) {
        super(props);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    componentDidMount() {
        this.isMounted = true;
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    redirectToPage(url) {
        let authenticated = auth.checkPermission(url);
        console.log("URL: " + url + " AUTH " + authenticated);
        if (authenticated) {
            console.log(this);
            context.push(url);
        }
    }
        
    render() {
        console.log(this.redirectToPage);
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login/>} />
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/dashboard" exact component={RequireAuth(Home, auth.checkPermission)}/>
                    <Route path="/manage" exact component={RequireAuth(Manage, auth.checkPermission)}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        );
    }
}

const auth = {
    async checkPermission(url) {
        axios.get(`${process.env.BACK_END_URL}\\authCheck`).then((response) => {
            if (url === 'signin' || url === 'signup' || url === 'logout') return true;
            else if (url === 'manage') {
               return response.data.authStatus && response.data.admin; 
            }
            return response.data.authStatus;
        });
    },
    signout(callback) {
        axios.post(`process.env.BACK_END_URL\${signOut}`);
    }
};

export default App;
