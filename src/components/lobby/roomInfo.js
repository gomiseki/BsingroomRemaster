import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%auto;
    border: 1px solid lightgray;
    margin: 20px;
    padding: 20px;
    color: lightgray;
    overflow-y: auto;
    align-items: center;
`

const Label = styled.div`
  flex: 1;
  width: 100%;
  padding-bottom: 20px;
  font-size:20px;
  border-bottom: solid 1px lightgrey;
`
const RoomBlock = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  height: 30px;

`
function Room({user,room,navigate,volume}){

    const enter = (roomname) => {
        user.joinRoom(roomname);
        navigate('/room',{replace:true, state:{volume:volume}})
    }

    return (
        <RoomBlock>
          <div style={{flex:"3"}}>
            {room.roomname.slice(5)} 
          </div>
          <div style={{flex:"1"}}>
          🎤:{room.membercount}
          </div>
          <div style={{flex:"1", }}>
            {room.membercount == 5 ? null : <button style={{}} onClick={()=>enter(room.roomname)}>입장</button>}
          </div>
        </RoomBlock>
      );
    } 

function RoomsInfo({user,rooms,navigate,volume}){
    return( 
    <Container>  
        <Label>Room List</Label>
        <div style={{flex:"10", width:"100%",paddingTop:"20px"}}>
          {rooms.filter(x=>x.roomname).map(room => (
          <Room
            room={room}
            key={room.id}
            user={user}
            navigate={navigate}
            volume={volume}
          />
          ))}
        </div>
    </Container>
    )
}

export default RoomsInfo