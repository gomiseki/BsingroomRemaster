import React,{useCallback, useState, useEffect, useRef} from "react";
import styled from "styled-components";
import CustomButton from "../btn";

const Container = styled.div`
    flex: ${props=>props.flex};
    display: flex;
    flex-direction: column;
    align-items: stretch;
`
const ChatContainer = styled.div`
    flex: 0 0 80%;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%auto;
    overflow: hidden;
`
const Title = styled.div`
    height: 10%;
    display:flex;
    margin:0 10px;
    border-bottom: 1px solid lightgray;
    align-items: center;
    color: white;
`
const ChatText = styled.div`::-webkit-scrollbar{
    width: 10px;
    border-radius: 5px;
    background-color: silver;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: darkgray;
}
    width:100%auto;
    padding: 10px;
    overflow-y:auto;
    height:32vw;
`
const SendContainer = styled.form`
    flex: 0 0 18%;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
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
    align-items: ${props=>props.align};
`
const UserInfo = styled.pre`
    margin: 2px;
`

const Chat = styled.pre`
    color: white;
    padding:5px;
    min-width: 50px;
    width: fit-content;
    height: fit-content;
    white-space: pre-line;
    word-break: break-all;
    border: 1px solid silver;
    border-radius:5px;
    margin:2px;
`

const ChatBlock = ({align,chat}) =>{
    return(
        <ChatDiv align={align}>
            <UserInfo>{chat.icon} {chat.nickname}</UserInfo>
            <Chat>{chat.chat}</Chat>
        </ChatDiv>
    )
}

const ChatList = React.memo(function ChatList({chattings, user}){
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