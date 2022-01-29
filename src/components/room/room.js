import React, {useEffect, useState, useContext, useRef, useCallback} from "react"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Devices from "../lobby/devices";
import Chatting from "./Chatting";
import ReservedSongList from "./reservedSongList";
import UserList from "./userList";
import YTVideo from "./YTVideo";
import {UserDispatch} from '../../app.js'
import CustomButton from "../btn";
import {User} from '../../modules/user'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

const FlexContainer = styled.div`
    flex: ${props=> props.flex};
    height: 100%;
    display: flex;
    flex-direction: column;
`
const TitleInput = styled.input`
    flex: ${props=> props.flex};
    margin: 5px;
    border: 1px solid lightgray;
    overflow-x: hidden;
    border-radius: 5px;
    background-color: transparent;
    padding: 0px 10px;
    font-size: x-large;
    color: white;
`
const Title = ({value, flex}) =>{
    return(
        <TitleInput flex={flex} value={value}/>
    )
}

function Room() {
    
    var {user, setUser} = useContext(UserDispatch); //유저 전역관리
    const navigate = useNavigate(); //리다이렉트


    useEffect(() => {
        console.log(user)
        user.socket.emit('fetchMember', user.roomInfo)
        
        user.socket.on("breakRoom",()=>{
            exitRoom()
        })

        return () => {
            user.socket.removeAllListeners();
        };
    }, []);



    const exitRoom = () =>{
        user.socket.emit('leaveRoom', user.roomInfo, user.host)
        user.host=false;
        navigate('/lobby', {replace:true, state: { nickname : user.nickname, icon : user.userIcon}})
    }

    return (
        <Container>
            <div style={{flex:"11", display:'flex', width:'100%'}}>
            <FlexContainer flex={'2'}>
                <ReservedSongList flex={'1'}></ReservedSongList>
                <UserList user={user} flex={'1'}></UserList>
            </FlexContainer>
            <FlexContainer flex={'4'}>
                <Title value={user.roomInfo.substr(5)} flex={'1'}></Title>
                <YTVideo flex={'10'}></YTVideo>
            </FlexContainer>
            <FlexContainer flex={'2'}>
                <Chatting flex={'10'} user={user}></Chatting>
                <div flex={'1'} style={{textAlign:'center'}}><CustomButton onClick={exitRoom} >방 나가기</CustomButton></div>
            </FlexContainer>
            </div>
            <Devices user={user} ></Devices>
        </Container>
    )}

export default Room