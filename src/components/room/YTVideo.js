import React, { useState, useRef } from "react";
import styled from "styled-components";
import CustomButton from "../btn";

const Container = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    display:flex;
    flex-direction: column;
`

const FlexContainer = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
`
const ReserveForm = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const NowInput = styled.input`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    overflow-x: hidden;
    background-color: transparent;
    font-size: large;
    padding: 0px 10px;
    color: white;
`

const Player = styled.div`
    pointer-events: none;
    border-radius: 5px;
`
const VideoView = () =>{
    return(
        <FlexContainer flex={'6'}>
            <Player id="player"></Player>
        </FlexContainer>
    )
}

const VideoTitle = ({now}) =>{
    return(
        <NowInput flex={'1'} value={now.title}/>
    )
}

const VideoReserve = ({user, stop, setSongVolume}) =>{

    const [songInput, setSongInput] = useState('');
    const [warning, setWarning] = useState('');

    const onSubmit = (e) =>{

        e.preventDefault();
        console.log(songInput)
        fetch('https://www.youtube.com/oembed?url='+songInput)
        .then(response => response.json())
        .then(data=>{
            user.socket.emit("createReserv",user.roomInfo,user.socket.id,data.title,songInput);
            setWarning("예약되었습니다.")
        })
        .catch(e=>{
            console.log(e)
            setWarning("유효하지 않은 URL입니다.")
        })
        setSongInput('')
        setTimeout(() => {
            setWarning('')
        }, 3000);
    }

    const onChange = (e) =>{
        setSongInput(e.target.value)
    }

    const onVolumeChange = (e) =>{
        setSongVolume(e.target.value)
    }
    return(
        <FlexContainer flex={'3'}>
            <ReserveForm onSubmit={onSubmit}>
                <div style={{width:'100%', textAlign:'center'}}>
                    <input style={{width:'70%', height:'25px', marginBottom:'5px', border:"none", borderRadius:"5px"}} type={'url'} placeholder={'Youtube URL'} value={songInput} onChange={onChange}/>
                    <input readOnly type={"text"} value={warning} style={{backgroundColor:"transparent", color:"red", width:"70%",border:"none"}}/>
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <CustomButton type={"submit"}>예약</CustomButton>
                    <CustomButton type={"button"} style={{margin:'0 20px'}} onClick={stop}>취소</CustomButton>
                    <input type={'range'} min={0} max={100} onChange={onVolumeChange} />
                </div>
            </ReserveForm>
        </FlexContainer>
    )
}

const YTVideo = ({user, flex, now, stop, setSongVolume})=>{

    return(
        <Container flex={flex}>
            <VideoView></VideoView>
            <VideoTitle now={now}></VideoTitle>
            <VideoReserve user={user} stop={stop} setSongVolume={setSongVolume}></VideoReserve>
        </Container>
    )
}
export default YTVideo