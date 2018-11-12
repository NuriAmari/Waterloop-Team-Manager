import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

axios.defaults.withCredentials = true;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false,
            loginSuccessfull: false,
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();
        if (event.target.name === "username") {
            this.setState((prevState, props) => {
                prevState.username = event.target.value;
                return prevState;
            });
        } else if (event.target.name === "password") {
            this.setState((prevState, props) => {
                prevState.password = event.target.value;
                return prevState;
            });
        }
    }

    handleSubmit(event) {
        event.persist();
        event.preventDefault();
        this.setState((prevState, props) => {
            prevState.loginFailed = false;
            return prevState;
        });
        axios.post(`${process.env.BACK_END_URL}/login`,
            {username: this.state.username, password: this.state.password}
        ).then((response) => {
            if (response.data.authStatus) {
                this.props.redirectFnc(() => this.props.history.push('/dashboard'));
            } else {
                this.setState(prevState => ({...prevState, loginFailed: true}));
            }
        });
    }

    render() {
        return (
            <Wrapper>
                <img width="180px" src="../../img/waterloop_icon.svg"/>
                {this.state.loginFailed &&
                        <p>Username or password is wrong</p>
                }
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Username" type="text" name="username" onChange={this.handleChange}/>
                    <input placeholder="Password" type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="Log In"/>
                </form>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;

    form {
        margin-top: 20px;
        flex-direction: column;
        width: 100%;
        display: flex;
        align-items: center;
    }

    input {
       height: 25px;
       width: 80%;
       max-width: 300px;
       margin-top: 20px;
       padding: 3px;
       padding-left: 5px;
       border: 1px solid black;
    }

    input[type=submit] {
       background-color: black; 
       color: white;
    }
`;

export default withRouter(Login);
