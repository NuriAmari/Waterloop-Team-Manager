import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route, Link, Switch, withRouter } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PageNotFound from "./PageNotFound";

axios.defaults.withCredentials = true;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    redirectToProtectedPage(url) {
        auth.checkStatus(() => this.props.history.push(url));
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login redirectFnc={auth.checkAuthStatus}/>} />
                    <Route path="/test" component={PageNotFound}/>
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        );
    }
}

const auth = {
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

function PrivateRoute({component: Component, ...rest }) {
    console.log(auth.authStatus);
    return (
        <Route
          {...rest}
          render={props =>
            auth.authStatus ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          }
    />);
}

export default App;
