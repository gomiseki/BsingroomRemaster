import React from "react";
import styled from "styled-components";

const Container = styled.div`
    flex: ${props=>props.flex};
    width: 100%auto;
    height: 100%auto;
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const Title = styled.div`
    color: white;
    margin: 0 15px;
    width: 80%auto;
    height: 15%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
`
const SongContainer = styled.div`::-webkit-scrollbar{
    width: 10px;
    border-radius: 5px;
    background-color: silver;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: darkgray;
}
    width:100%auto;
    padding:0 15px;
    overflow-y:auto;
    height:20vw;
`

const SongBlock = styled.h3`
    width: 100%;
    margin:5px;
    color: white;
`
function ReservedSongList({songURLs, flex}){
    console.log(songURLs);
    return(
        <Container flex={flex}>
            <Title>예약</Title>
            <SongContainer>
            {songURLs.map(song=><SongBlock key={song.key}>{song.title}</SongBlock>)}
            </SongContainer>
        </Container>
    )
}
export default ReservedSongList