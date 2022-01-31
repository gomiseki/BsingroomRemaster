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
import useSongs from "../../modules/useSongs";

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
        <TitleInput readOnly flex={flex} value={value}/>
    )
}

function Room() {
    
    var {user, setUser} = useContext(UserDispatch); //유저 전역관리
    const navigate = useNavigate(); //리다이렉트

    const [songURLs, setSongURLs, playing, setPlaying, now, setNow] = useSongs(user);
    const songID = useRef(0);
    const player = useRef();

    useEffect(() => {
        //Youtube API   
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        user.socket.emit('fetchMember', user.roomInfo)
        
        user.socket.on("breakRoom",()=>{
            exitRoom()
        })

        //song event
        user.socket.on("showReservedSong", (senderID,title,url)=>{
            setSongURLs((songURLs)=>songURLs.concat({id:senderID,title:title,url:url,key:songID.current}))
            songID.current += 1;
            console.log(songURLs)
        })

        user.socket.on("playReservedSong", (playData)=>{
            setVideo(playData.url);
            setSongURLs(songURLs=> songURLs.slice(1,songURLs.length));
            setNow(playData);
        })


        user.socket.on("setPlayingStop", ()=>{
            player.current.destroy();
            setPlaying(false);
            setNow({id:"", title:"",url:""});
        })
        return () => {
            user.socket.removeAllListeners();
        };
    }, []);

    const youtubeParser = (url) =>{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const setVideo =(url)=>{
        const ytbID = youtubeParser(url);
        if(ytbID){
            player.current = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: ytbID,
                playerVars: { 'autoplay': 1, 'controls': 0 },
                events:{
                    onStateChange: songUpdate
                }
                });
        }
    }

    const songUpdate = (e)=>{
        console.log(e.target)
        if((e.data==0)){
            e.target.h.replaceWith(e.target.m)
            if(user.host){
                user.socket.emit("setStop", user.roomInfo)
            }
        }
    }

    const onStop = (e) =>{
        if(playing && (user.host||(now.id==user.socket.id))){
            player.current.destroy();
            setPlaying(false);
            setNow({id:"", title:"",url:""});
        }
    }

    const setSongVolume = (vol) =>{
        if(player.current.getPlayerState()==1 && playing){
            player.current.setVolume(vol);
        }
    }
    useEffect(()=>{
        if((songURLs.length>0&&!playing)&&(user.host)){
            console.log(playing)
            setPlaying(true);
            setTimeout(() => {
                user.socket.emit("playSong", user.roomInfo, songURLs[0])
            }, 3000);
        }

    },[playing, songURLs])

    const exitRoom = () =>{
        user.socket.emit('leaveRoom', user.roomInfo, user.host)
        user.host=false;
        navigate('/lobby', {replace:true, state: { nickname : user.nickname, icon : user.userIcon}})
    }

    return (
        <Container>
            <div style={{flex:"11", display:'flex', width:'100%'}}>
            <FlexContainer flex={'2'}>
                <ReservedSongList songURLs={songURLs} flex={'1'}></ReservedSongList>
                <UserList user={user} flex={'1'}></UserList>
            </FlexContainer>
            <FlexContainer flex={'4'}>
                <Title value={user.roomInfo.substr(5)} flex={'1'}></Title>
                <YTVideo user={user} now={now} flex={'10'} stop={onStop} setSongVolume={setSongVolume}></YTVideo>
            </FlexContainer>
            <FlexContainer flex={'2'}>
                <Chatting flex={'0 0 90%'} user={user}></Chatting>
                <div  style={{textAlign:'center', flex:"0 0 10%",display:'flex',justifyContent:'center',alignItems:'center'}}><CustomButton onClick={exitRoom} >방 나가기</CustomButton></div>
            </FlexContainer>
            </div>
            <Devices user={user} ></Devices>
        </Container>
    )}

export default Room