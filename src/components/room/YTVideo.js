import React from "react";
import styled from "styled-components";

const Container = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
`

function YTVideo({flex}){

    return(
        <Container flex={flex}></Container>
    )
}
export default YTVideo