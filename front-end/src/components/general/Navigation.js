import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Navigation extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.linkHandler = this.linkHandler.bind(this);
        this.state = {
            isOpen: false,
            isAdmin: this.props.adminStatus,
        };
    }

    toggle() {
        console.log('toggle');
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    componentDidMount() {
        this._isMounted = true;
    }

    linkHandler(destination) {
        this.toggle();
        if (destination === 'logout') {
            axios.post(`${process.env.BACK_END_URL}/logout`).then(() => {
                this.props.history.push('/');
            });
            return;
        }
        if (this.props.checkPermission(destination)) {
            this.props.history.push('/protected/' + destination);
        }
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">WatHub</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/resources">Resources</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">
                                    {this.props.test}
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon="user" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Account</DropdownItem>
                                    {this.state.isAdmin && (
                                        <DropdownItem
                                            onClick={() =>
                                                this.linkHandler('manage')
                                            }
                                        >
                                            Manage
                                        </DropdownItem>
                                    )}
                                    <DropdownItem divider />
                                    <DropdownItem
                                        onClick={() =>
                                            this.linkHandler('logout')
                                        }
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Navigation);
