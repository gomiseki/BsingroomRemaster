import React,{useCallback, useState, useEffect, useRef} from "react";
import styled from "styled-components";
import CustomButton from "../btn";

const Container = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 90%auto;
    display: flex;
    flex-direction: column;
`
const ChatContainer = styled.div`
    flex: 5;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%auto;
    display:flex;
    flex-direction: column;
`
const Title = styled.div`
    display:flex;
    flex: 1;
    width: 100%auto;
    margin:0 10px;
    border-bottom: 1px solid lightgray;
    align-items: center;
    color: white;
`
const ChatText = styled.div`
    flex: 10;
    padding: 5px;
    width: 100%auto;
`
const SendContainer = styled.form`
    flex: 1;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const TextInput = styled.textarea`
    height: 40%;
    width: 100%auto;
    color: white;
    background-color: #0000001a;
    border: 2px solid lightgray;
    border-radius:5px;
    resize: none;
`
const ChatDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%auto;
    height: 100%auto;
    align-items: ${props=>props.align};
`
const UserInfo = styled.pre`
    margin: 2px;
`

const Chat = styled.pre`
    color: white;
    padding:5px; 
    text-align: center;
    min-width: 50px;
    width: fit-content;
    height: fit-content;
    word-break:break-all;
    border: 1px solid silver;
    border-radius:5px;
`

const ChatBlock = ({align,chat}) =>{
    return(
        <ChatDiv align={align}>
            <UserInfo>{chat.icon} {chat.nickname}</UserInfo>
            <Chat>{chat.chat}</Chat>
        </ChatDiv>
    )
}

const ChatList = React.memo(function({chattings, user}){
    console.log(chattings)
    return (
    <ChatContainer>
        <Title>채팅</Title>
        <ChatText>
            {chattings.map(chat =>chat.ID==user.ID? <ChatBlock key={chat.key} chat={chat} align={'flex-end'}/>:<ChatBlock key={chat.key}chat={chat} align={'flex-start'}/>)}
        </ChatText>
    </ChatContainer>
    )
})

const SendChat = ({value, onChange, onSubmit}) => {
   
    return (
        <SendContainer onSubmit={onSubmit}>
            <TextInput value={value} onChange={onChange}></TextInput>
            <CustomButton type={'submit'} size={'small'}>💬</CustomButton>
        </SendContainer>
    )
}

function Chatting({flex, user}){

    const [message, setMessage] = useState('');
    const [chattings, setChattings] = useState([]);
    const nextId = useRef(0);

    const onChange = (e) =>{ 
        setMessage(e.target.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        user.socket.emit('sendChat', user.roomInfo, message)
        setMessage('')
    }
    

    useEffect(() => {
        user.socket.on('showChat', (content)=>{
            content.key = nextId.current
            setChattings((chattings)=>chattings.concat(content))
            nextId.current += 1
        })
    }, []);
    
    return(
        <Container flex={flex}>
            <ChatList user={user} chattings={chattings}></ChatList>
            <SendChat value={message} onChange={onChange} onSubmit={onSubmit}></SendChat>
        </Container>
    )
}
export default Chatting