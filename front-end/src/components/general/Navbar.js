import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './UserDropdown';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.profileDropdown = React.createRef();
        this.profileClickHandler = this.profileClickHandler.bind(this);
        this.state = {
            user: props.user,
        }
    }

    profileClickHandler(event) {
        this.profileDropdown.current.toggle();
    }

    render() {
        return (
            <StyledBar>
                <img src='../../../img/waterloop_icon_white.svg'/>
                <div onClick={this.profileClickHandler} id='profile-dropdown-btn'>
                    <FontAwesomeIcon icon="user" />

                    <Dropdown ref={this.profileDropdown}/>
                </div>
            </StyledBar>
        );
    }
}

const StyledBar = styled.div`
    
    width: 100%;
    height: 50px;
    background: black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > img {
        height: 30px;
        margin: 10px;
    }

    div {
        height: 50px;
        width: 50px;

        svg {
            height: 50px;
            color: white;
        }
    }
`;

export default Navbar;
