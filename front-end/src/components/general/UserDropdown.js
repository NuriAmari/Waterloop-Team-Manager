import React from 'react';
import styled from 'styled-components';

class UserDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    toggle() {
        this.setState((prevState, props) => ({open: !prevState.open}));
    }

    render() {
        return (
            <div>
                {this.state.open && 
                    <Wrapper>
                        <div>Profile</div>
                        <div>Settings</div>
                        <div>Logout</div>
                    </Wrapper>
                }
            </div>
        );
    }
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width: 50px;
    align-items:stretch;
    > div {
        height: 50px;
        border: 1px solid black;
    }
`;

export default UserDropdown;
