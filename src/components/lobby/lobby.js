import React ,{useState, useEffect, useContext}from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {UserDispatch} from '../../app.js'
import styled from 'styled-components';
import bsing from "../../img/B대면노래방.png";
import CustomButton from '../btn';
import RoomsInfo from '../lobby/roomInfo'
import RoomCreate from '../lobby/roomCreate'
import Devices from '../lobby/devices'
import {Me} from '../../modules/user'

const Background = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
`
const Bsing = styled.img`
    flex: 1;
    width: 480px;
`
const Rooms = styled.div`
    display: flex;
    flex: 10;
    width:80%;
`
const Info = styled.pre`
    font-size: larger;
    padding: 20px;
    max-width: 200px;
    overflow: hidden;
    position: absolute;
    top: 60px;
    right: 120px;
    border: solid 1px lightgrey;
    color: lightgray;
`
const UserInfo = ({icon, nickname}) =>{
    return(
        <Info>
            {icon}   {nickname}
        </Info>
    )
}

function Lobby(){
    const navigate = useNavigate();

    var {user, setUser} = useContext(UserDispatch); //유저 전역관리
    const [rooms, setRooms] = useState([]);         //채팅방 state

    useEffect(() => {      //컴포넌트 렌더링 시 유저 인스턴스 생성
        
        if(!user)
        setUser(new Me(history.state.usr.icon, history.state.usr.nickname))
        console.log(user)

        return () => {
            user.socket.removeAllListeners();   //socketOn 이벤트는 리렌더링할 때마다 수가 늘어남에 따라 재등록을 방지함.
        };
    }, []);

    useEffect(() => {       //유저 인스턴스 생성 후 채팅방 정보 업데이트
        if(user){
            user.ID = user.socket.id;
            user.socket.on('showRoomList', (rooms)=>{       
                let roomList = [];
                console.log(rooms)
                for(var i=0; i<rooms.length; ++i){
                    //if (rooms[i])
                    if(rooms[i].item.slice(0,4)=="room")
                    roomList.push({roomname:rooms[i].item, membercount:rooms[i].leng})
                }
                setRooms(roomList)
            })
            fetchRoom();
        }
    }, [user]);

    const fetchRoom = () => {       
        user.socket.emit("fetchRoom")
        console.log('fetch')
    };

    const goIntro = (e) =>{
        e.preventDefault();
        navigate('/', {replace:true})
        user.socket.disconnect();
        user.audioCtx.close();
        setUser(null);
    }

    return(
        <Background>
            <CustomButton onClick={goIntro} style={{position:"absolute", left:"120px", top: "60px"}} size="large" type="submit">Back</CustomButton>
            <UserInfo icon={history.state.usr.icon} nickname={history.state.usr.nickname}/>
            <Bsing src={bsing}></Bsing>
            <Rooms>
                <RoomsInfo user={user} rooms={rooms} navigate={navigate}/>
                <RoomCreate user={user} navigate={navigate} ></RoomCreate>
            </Rooms>
            <Devices user={user}></Devices>
        </Background>
    )
}
export default Lobby