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
    DropdownItem } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logOutHandler= this.logOutHandler.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logOutHandler(event) {
      // Log the user out
      axios.post(`${process.env.BACK_END_URL}/logout`).then(() => {
          console.log(this);
        this.props.history.push('/');
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/dashboard">
                <img height="20px" src="../../img/waterloop_icon_white.svg"/>
            </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <FontAwesomeIcon icon="user" />                  
                </DropdownToggle>
                <StyledDropdownMenu right>
                  <DropdownItem>
                    Profile   
                  </DropdownItem>
                  <DropdownItem>
                    Settings 
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logOutHandler}>
                    Log Out
                  </DropdownItem>
                </StyledDropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const StyledDropdownMenu= styled(DropdownMenu) `
`;

export default withRouter(NavBar);
