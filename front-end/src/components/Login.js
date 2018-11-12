import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        axios.post(`${process.env.BACK_END_URL}/login`,
            {username: this.state.username, password: this.state.password}
        ).then((response) => {
            console.log(response);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange}/>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        );
    }
}

const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export default Login;
