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

const NewUserModal = props => {
    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Add New User</ModalHeader>
                <ModalBody>
                    <div>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>
                                    Email
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePassword" sm={2}>
                                    First Name
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
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
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup tag="fieldset" row>
                                <legend className="col-form-label col-sm-2">
                                    Radio Buttons
                                </legend>
                                <Col sm={10}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio2" />{' '}
                                            Option one is this and that—be sure
                                            to include why it's great
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio2" />{' '}
                                            Option two can be something else and
                                            selecting it will deselect option
                                            one
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check disabled>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="radio2"
                                                disabled
                                            />{' '}
                                            Option three is disabled
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="checkbox2" sm={2}>
                                    Checkbox
                                </Label>
                                <Col sm={{ size: 10 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                id="checkbox2"
                                            />{' '}
                                            Check me out
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default NewUserModal;
