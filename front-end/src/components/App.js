import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import RequireAuth from './general/RequireAuth';
import SignUp from './pages/SignUp';

axios.defaults.withCredentials = true;

class App extends React.Component {
    isMounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.isMounted = true;
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    redirectToPage(url) {
        if (url === '/dashboard') {
            auth.checkStatus(() => this.props.history.push(url));
        } else {
            this.props.history.push(url);
        }
    }
        
    redirectToProtectedPage(url) {
        auth.checkStatus(() => this.props.history.push(url));
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login redirectFnc={auth.checkAuthStatus}/>} />
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/dashboard" exact component={RequireAuth(Home)}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        );
    }
}

const auth = {
    isLoading: false,
    authStatus: false,
    checkAuthStatus(callback) {
        axios.get(`${process.env.BACK_END_URL}\\authCheck`).then((response) => {
            if (response.data.authStatus) {
                auth.authStatus = true;
                callback();
            }
        });
    },
    signout(callback) {
        axios.post(`process.env.BACK_END_URL\${signOut}`);
        authStatus = false;    
    }
};

export default App;
