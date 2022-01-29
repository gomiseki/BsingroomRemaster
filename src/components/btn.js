import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
    large: {
        width: "100px",
        height: "45px",
        fontSize: "20px"
    },
    medium: {
        width: "80px",
        height: "32px",
        fontSize: "12px"
    },
    small: {
        width: "50px",
        height: "30px",
        fontSize: "15px"
    }
  };

const sizeStyles = css`
  ${({ size }) => css`
    width: ${sizes[size].width};
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const Btn = styled.button`
    ${sizeStyles}
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
Btn.defaultProps = {
    size: 'medium'
}
function CustomButton({color, size, children, style, onClick}) {
    return (
        <Btn onClick={onClick} style={style} color={color} size={size}>{children}</Btn>
    )}

export default CustomButton;