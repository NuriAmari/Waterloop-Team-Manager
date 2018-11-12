import styled from 'styled-components';

const Button = (props) => (
    <StyledButton type={props.type} value={props.value}/>   
);

const StyledButton = styled.input`

    background-color: black;
    height: 50px;
    max-width: 300px;
`
export default Button;
