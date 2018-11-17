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
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

class NavBar extends React.Component {
constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
				isOpen: false,
				user: null,
		};
		this.linkHandler= this.linkHandler.bind(this);
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
    linkHandler(event) {
        if (event.target.name === 'logout') {
			// Log the user out
			axios.post(`${process.env.BACK_END_URL}/logout`).then(() => {
                console.log(this);
				this.props.history.push('/');
            });
        } else if (event.target.name === 'manage') {
            this.props.history.push('/manage');
        }
	}
	componentWillReceiveProps(newProps) {
			this.setState((prevState, props) => ({...prevState, user: newProps.user})); 	
	}
	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="md">
						<div>
                            <Link to="/dashboard"><img height="20px" src="../../img/waterloop_icon_white.svg"/></Link>
						</div>
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
									{ this.state.user && this.state.user.admin && 
										<DropdownItem name="manage" onClick={this.linkHandler}>
											Manage
										</DropdownItem>
									}
									<DropdownItem>
										Settings 
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem name="logout" onClick={this.linkHandler}>
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
