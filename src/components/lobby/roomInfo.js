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
  margin-bottom: 50px;
  border-bottom: solid 1px lightgrey;
`

function Room({user,room,navigate}){

    const enter = (roomname) => {
        user.joinRoom(roomname);
        navigate('/room',{replace:true})
    }

    return (
        <div style={{marginTop:'6px'}}>
          
            {room.roomname.slice(5)} <span>: {room.membercount}명</span>
          
          &nbsp;
          {room.membercount == 5 ? null : <button onClick={enter(room.roomname)}>입장</button>}
        </div>
      );
    } 

function RoomsInfo({user,rooms,navigate}){
    return( 
    <Container>  
        <Label>Room List</Label>
        <div style={{flex:"10"}}>
          {rooms.filter(x=>x.roomname).map(room => (
          <Room
            room={room}
            key={room.id}
            user={user}
            navigate={navigate}
          />
          ))}
        </div>
    </Container>
    )
}

export default RoomsInfo