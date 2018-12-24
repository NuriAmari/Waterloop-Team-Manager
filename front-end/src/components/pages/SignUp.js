import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Alert, FormGroup, Label, Form, Button, Input } from 'reactstrap';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpFailed: false,
            onboardingcode: '',
            firstname: '',
            lastname: '',
            password: '',
            repeatpassword: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        switch(String(event.target.name)) {
            case 'onboardingcode':
            case 'firstname':
            case 'lastname':
            case 'password':
            case 'repeatpassword':
        }
    }
    render() {
        return (
            <Wrapper>
                <div className="border" id='signup'>
                    <h2>Join WatHub</h2>
                    <p>Before signing up, please contact your team lead or contact the web team to get your onbording code.</p>
                    <Form onSubmit={this.handleSubmit}>
                    {this.state.signUpFailed &&
                        <Alert color="danger">
                            <p>Username or password is wrong</p>
                        </Alert>
                    }
                    <FormGroup>
                        <Label for="onboardingcode">Onboarding Code</Label>
                        <Input type="text" name="onboardingcode" id="onboardingcode" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstname">First Name</Label>
                        <Input type="text" name="firstname" id="firstname" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Last Name</Label>
                        <Input type="text" name="lastname" id="lastname" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" name="password" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="repeatpassword">Repeat Password</Label>
                        <Input id="repeatpassword" type="password" name="repeatpassword" onChange={this.handleChange}/>
                    </FormGroup>
                    <Button color="warning" type="submit" value="Log In">Sign in</Button>
                    </Form>
                </div>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div` 
   width: 100%;
   height: 100%;
   background-color: #fafafa;
   display: flex;
   align-items: center;
   justify-content: center;

   #signup {
     padding: 20px;
     border-radius: 3px;
     width: 480px;
     background-color: white;
   }
`;

export default SignUp;
