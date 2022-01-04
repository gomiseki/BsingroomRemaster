import React from 'react';
import styled from 'styled-components';
import mirrorball from "../../img/mirrorball.png";
import bchar from "../../img/B대면인트로캐릭터.png";
import bsing from "../../img/B대면노래방.png";
import Login from "./login"

const Background = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Mirrorball = styled.img`
    width: 155px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
`
const Container = styled.div`
    margin: auto;
    width: 90%;
    height: 90%;
    border-radius: 20px; 
    border: 1px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Charactor = styled.div`
    flex: 1;
`
const Enter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`
const Bchar = styled.img`
    width: 500px;
    height: 500px;
`

const Bsing = styled.img`
    width: 480px;
    height: 170px;
`

function Intro() {
    return (
        <Background>
             <Mirrorball src={mirrorball}></Mirrorball>
             <Container>
                <Charactor>
                    <Bchar src={bchar}></Bchar>
                </Charactor>
                <Enter src={bsing}>
                    <Bsing src={bsing}></Bsing>
                    <Login></Login>
                </Enter>
             </Container>
        </Background>

    )}
  
  export default Intro;
