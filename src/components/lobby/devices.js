import React,{useState, useEffect, useRef} from "react";
import styled from 'styled-components';


const Container = styled.div`
    flex: 2;
    display:flex;
    width: 80%;
    color: lightgray;
    overflow-y: auto;
    align-items: center;
`

const Copyright = styled.div`
    flex: 2;
    padding: 8px;
    margin-right: 20px;
    border: 1px solid lightgray;
    text-align: center;
`

const Control = styled.div`
    display: flex;
    flex: 5;
    height: 60%;
    border: 1px solid lightgray;
    justify-content: space-around;
    align-items: center;
`

const DeviceSelect = styled.select`
    display: block;
    width: 40%;
    height: 50%;
    border: 1px solid lightgray;
    border-radius: 10px;
`

const VolumeInput = styled.input`
`
let dvList = []

const Device = ({selected, onChange}) =>{
    console.log(dvList);
    return(
        <DeviceSelect value={selected} onChange={onChange}>
            {dvList.map((device) => (
                <option value={device.dvID}>
                {device.dvLabel}
                </option>
            )
        )}
        </DeviceSelect>
    )
}

const Volume = ({user}) =>{
    const voRef = useRef();
    const onChange = (e) =>{
        user.setLocalVolume(e.target.value)
    }
    useEffect(() => {
        if(user){
            voRef.current.value = user.localGainNode.gain.value
        }
    }, [user]);
    return(
        <VolumeInput type={"range"} max={1} min={0} step={0.01} ref={voRef} onChange={onChange}>

        </VolumeInput>
    )
}

function Devices({user}){

    const [selected, setSelected] = useState("default");
    const audioRef = useRef();

    const onChange = (e) =>{
        if(user){
            user.setMedia(e.target.value);
            setSelected(e.target.value)
        }
    }

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
        .then((list)=> {
            list.forEach((device)=>{
                if(device.kind=='audioinput'){
                dvList.push({dvID:device.deviceId, dvLabel:device.label})
                }
            })
        })
        
        return () => {
            dvList = []
        };
    }, []);

    const media = async()=>{
        await user.setMedia();
        console.log(user.localDestination);
        user.setLocalAudio(audioRef.current)
    }

    useEffect(() => {
        if(user){
            media();
        }
    }, [user]);

    return( 
    <Container>
        <Copyright>@Copyright 소프트웨어 공학 1조</Copyright>
        <Control>
            <p>마이크 장치</p>
            <Device user={user} selected={selected} onChange={onChange}></Device>
            <Volume user={user}></Volume>
            <audio ref={audioRef}></audio>
        </Control>
    </Container>
    )
}

export default Devices