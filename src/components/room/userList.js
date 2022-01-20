import React,{useRef, useEffect} from "react";
import styled from "styled-components";
import { Me } from "../../modules/user";

const Container = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    margin: 5px;
    border: 1px solid lightgray;
    overflow-x: auto;
    border-radius: 5px;
`
const Title = styled.div`
    color: white;
    margin: 15px;
    width: 80%auto;
    height: 10%;
    display: flex;
    border-bottom: 1px solid lightgray;
`

const UserDisplay = styled.div`
    margin: 5px;
    width: 100%auto;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Nickname = styled.div`
    padding-left: 5px;
    width:60%;
`
const Icon = styled.div`
    text-align: center;
    width:20%;
`
const VolumeInput = styled.input`
    width:20%;
`

const Volume = ({member}) =>{

    const setVolume = (e) => {
        console.log(e.target)
    }

    member.setAudio(audioRefs.current.find((id)=>id==member.ID))
    return(
        <VolumeInput  max="1" min="0" step="0.1" onChange={setVolume}></VolumeInput>
    )
}
function UserList({flex, members, volume}){

    const audioRefs = useRef([]);
    audioRefs.current = [];


    return(
        <Container flex={flex}>
            <Title>참가자</Title>
            {members.map(member =>(
            !member.ID ?
            <UserDisplay style={{border:"1px solid lightgray", borderRadius:"5px"}}>
                <Icon>{member.userIcon}</Icon>
                <Nickname>{member.nickname}</Nickname>
                <audio ref={()=>audioRefs.current.push("me")}/>
            </UserDisplay>
            :
            <UserDisplay>
                <Icon>{member.userIcon}</Icon>
                <Nickname>{member.nickname}</Nickname>
                <Volume member={member} type="range"></Volume>
                <audio ref={()=>audioRefs.current.push(member.ID)}/>
            </UserDisplay>
            ))}
        </Container>
    )
}
export default UserList