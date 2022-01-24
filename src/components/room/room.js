import React, {useEffect, useState, useContext, useRef} from "react"
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
const Title = styled.div`

`

function Room() {
    
    var {user, setUser} = useContext(UserDispatch); //유저 전역관리
    const navigate = useNavigate(); //리다이렉트

    const members = useRef([]); //참가유저 관리
    members.current = [];
    const [memberState, setmemberState] = useState(members.current);

    const devideConnect = async(data, joined, memberList)=>{
        console.log(memberList)
        let tempMemberList = [user];
        for(const value of data){
            if(value.id!=user.ID)
            tempMemberList.push(new User(value.icon, value.nickname, value.id)) 
        }
        console.log(memberList)
        if(memberList.length<tempMemberList.length){
            let needConnection = tempMemberList.filter(member=> !memberList.includes(member))
            needConnection.forEach((member)=>{
                member.setConnection(user,joined)
            })
        }
        else{
            let needDisConnection = memberList.filter(member=> !tempMemberList.includes(member))
            needDisConnection.forEach((member)=>{
                member.connection.close();
                member.audioCtx.close();
            })
        }
        return tempMemberList
    }
    useEffect(() => {

        user.socket.emit('fetchMember', user.roomInfo)

        user.socket.on("showMemberList", (data, joined)=>{
            let tempMemberList =  devideConnect(data, joined, members.current);
            members.current = tempMemberList
            setmemberState(tempMemberList)
            console.log(data)
        })

        user.socket.on("offer", (offer, senderID) => {
            members.current.forEach((member)=>{
                if(member.ID==senderID)member.setOffer(user,offer);
            })
          });
        
        user.socket.on("answer", (answer, senderID) => {
            members.current.forEach((member)=>{
                if(member.ID==senderID)member.setAnswer(answer);
            })
        });

        user.socket.on("ice", (ice, senderID) => {
            members.current.forEach((member)=>{
                if(member.ID==senderID)member.setIce(ice);
            })
          });
        
        if(user.host){

        }
        else{

        }
        return () => {
            user.socket.removeAllListeners();
        };
    }, []);

    const exitRoom = (e) =>{
        navigate('/lobby', {replace:true, state: { nickname : user.nickname, icon : user.userIcon}})
    }

    return (
        <Container>
            <div style={{flex:"11", display:'flex', width:'100%'}}>
            <FlexContainer flex={'2'}>
                <ReservedSongList flex={'1'}></ReservedSongList>
                <UserList members={memberState} flex={'1'}></UserList>
            </FlexContainer>
            <FlexContainer flex={'4'}>
                <Title flex={'1'}></Title>
                <YTVideo flex={'1'}></YTVideo>
            </FlexContainer>
            <FlexContainer flex={'2'}>
                <Chatting flex={'10'}></Chatting>
                <div flex={'1'} style={{textAlign:'center'}}><CustomButton onClick={exitRoom} >방 나가기</CustomButton></div>
            </FlexContainer>
            </div>
            <Devices user={user} ></Devices>
        </Container>
    )}

export default Room