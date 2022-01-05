import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    position: relative;
    width: 80px;
    height: 32px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color:  ${props => props.color || '#EEEEEE'};
    border: 1px solid navy;
    border-radius: 5px;

    box-shadow: 3px 3px navy;

    &:hover {
        background: #FFFFFF;}
    &:active {
        background: #DDDDDD;}
`

function CustomButton({color, children}) {
    return (
        <Btn color={color}>{children}</Btn>
    )}

export default CustomButton;