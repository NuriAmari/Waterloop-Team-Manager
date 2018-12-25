import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
axios.default.withCredentials = true;

const RequireAuth = (Component) => { 
    
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
            if (this.props.location === '\\manage') {
                axios.get(`${process.env.BACK_END_URL}\\user`).then((response) => {
                    if (this._isMounted) {
                        if (response.data.user.admin) {
                            this.setState({isAuthenticated: true, isLoading: false});
                        } else {
                            this.setState({isLoading: false});
                        }
                    }
                });
            } else {
                axios.get(`${process.env.BACK_END_URL}\\authCheck`).then((response) => {
                    if (this._isMounted) {
                        if (response.data.authStatus) {
                            this.setState({isAuthenticated: true, isLoading: false});
                        } else {
                            this.setState({isLoading: false});
                        }
                    }
                });
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
           return <Component {...this.props} /> 
        }
    } 
    return withRouter(App);
} 

export default RequireAuth;
