import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
axios.default.withCredentials = true;

const RequireAuth = (Component, checkStatus) => { 
    
    class App extends React.Component { 
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false,
                isLoading: true,
            }
        }

        componentDidMount() {
            this._isMounted = true;
            let authenticated = checkStatus(this.props.location);
            if (authenticated) {
                if (this._isMounted) this.setState({isAuthenticated: true, isLoading: false});
            } else {
                if (this._isMounted) this.setState({isAuthenticated: false, isLoading: false});
            }
        } 

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() { 
           const { isAuthenticated, isLoading } = this.state;
           if(isLoading) {
               return <div>Loading...</div>
           }
           if(!isAuthenticated) {
               return <Redirect to="/" />
           }
           return <Component checkPermission={checkStatus} {...this.props} /> 
        }
    } 
    return withRouter(App);
} 

export default RequireAuth;
