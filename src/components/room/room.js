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
const Title = styled.div`
`

const useMember = (initialUser) => {
    const [memberState, setMembers] = useState(['me']);
    const memberRef = useRef([]);
    memberRef.current = [initialUser];

    const setMember = (memberData,user,joined) => {

        const idList = memberRef.current.map(x => x.ID)
        const dataIdList = memberData.map(x=>x.id)
        console.log(memberState, idList, dataIdList)
        if(idList.length<dataIdList.length){
            for(const member of memberData){
                if(!(member.id in idList) && member.id != user.ID ){
                    let newUser = new User(member.icon, member.nickname, member.id)
                    newUser.setConnection(user, joined)
                    memberRef.current.push(newUser)
                    setMembers(...memberState, member.id)
                    }
                }
        }else if(idList.length>dataIdList.length){
            for(const member of memberRef.current){
                if(!member.id in dataIdList){
                    member.connection.close();
                    member.audioCtx.close();
                    delete memberRef.current[memberRef.current.findIndex(member)]
                    setMembers(memberState.filter(id => id!=member.id))
                    }
                }
        }
        console.log(memberState)
    }
    return [memberState, memberRef, setMember]
}

function Room() {
    
    var {user, setUser} = useContext(UserDispatch); //유저 전역관리
    const navigate = useNavigate(); //리다이렉트

    const [memberState, memberRef, setMember] = useMember(user);

    useEffect(() => {

        user.socket.emit('fetchMember', user.roomInfo)

        user.socket.on("showMemberList", (data, joined)=>{
            console.log(data)
            setMember(data, user, joined)
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
    
        return () => {
            user.socket.removeAllListeners();
        };
    }, []);

    const exitRoom = (e) =>{
        user.socket.emit('leaveRoom', user.roomInfo, user.host)
        user.host=false;
        navigate('/lobby', {replace:true, state: { nickname : user.nickname, icon : user.userIcon}})
    }

    return (
        <Container>
            <div style={{flex:"11", display:'flex', width:'100%'}}>
            <FlexContainer flex={'2'}>
                <ReservedSongList flex={'1'}></ReservedSongList>
                <UserList members={memberState} ref={memberRef} flex={'1'}></UserList>
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