import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Col,
    Form,
    FormGroup,
    Label,
    FormText,
} from 'reactstrap';

class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            firstname: null,
            lastname: null,
            team: null,
            admin: false,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler(event) {
        event.persist();
        if (event.target.name === 'email') {
            this.setState(prevState => ({
                ...prevState,
                email: event.target.value,
            }));
        } else if (event.target.name === 'firstname') {
            this.setState(prevState => ({
                ...prevState,
                firstname: event.target.value,
            }));
        } else if (event.target.name === 'lastname') {
            this.setState(prevState => ({
                ...prevState,
                lastname: event.target.value,
            }));
        } else if (event.target.name === 'subteam') {
            this.setState(prevState => ({
                ...prevState,
                subteam: event.target.value,
            }));
        } else if (event.target.name === 'admin') {
            console.log(event.target.checked);
            this.setState(prevState => ({
                ...prevState,
                admin: event.target.checked,
            }));
        }
    }

    onSubmit() {
        // TODO basic validation
        const requestBody = { ...this.state };
        console.log(requestBody);
        fetch(`${process.env.BACK_END_URL}/newUser`, {
            method: 'post',
            body: JSON.stringify(requestBody),
        }).then(this.props.toggle());
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        Add New User
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <Form>
                                <FormGroup row>
                                    <Label for="email" sm={2}>
                                        Email
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="firstname" sm={2}>
                                        First Name
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>
                                        Last Name
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            onChange={this.changeHandler}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="subteam" sm={2}>
                                        Subteam
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="select"
                                            name="subteam"
                                            id="subteam"
                                            onChange={this.changeHandler}
                                        >
                                            <option>Software</option>
                                            <option>Mechanical</option>
                                            <option>Electrical</option>
                                            <option>Marketing</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="admin" sm={2}>
                                        Admin
                                    </Label>
                                    <Col sm={{ size: 10 }}>
                                        <FormGroup check>
                                            <Input
                                                style={{ marginTop: '11px' }}
                                                type="checkbox"
                                                id="admin"
                                                name="admin"
                                                onChange={this.changeHandler}
                                            />{' '}
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit}>
                            Create
                        </Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default NewUserModal;
