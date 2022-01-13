import React,{useState, useEffect} from "react";
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
const Device = ({deviceList, onChange}) =>{
    return(
        <DeviceSelect onChange={onChange}>
            {deviceList.map((device)=>(
            <option value={device.dvID}>
            {device.dvLabel}
            </option>
            ))}
        </DeviceSelect>
    )
}

const Volume = () =>{
    return(
        <VolumeInput type="range">

        </VolumeInput>
    )
}

function Devices({user}){

    const [deviceList, setDeviceList] = useState([]);

    const onChange = (e) =>{
        if(user){
            user.setMedia(e.target.value);
        }
    }
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
        .then((list)=> {
            let dvList = []
            list.forEach((device)=>{
                if(device.kind=='audioinput'){
                dvList.push({dvID:device.deviceId, dvLabel:device.label})
                }
            })
            setDeviceList(dvList)
        })
        return () => {
            
        };
    }, []);

    return( 
    <Container>
        <Copyright>@Copyright 소프트웨어 공학 1조</Copyright>
        <Control>
            <p>마이크 장치</p>
            <Device deviceList={deviceList} onChange={onChange}></Device>
            <Volume></Volume>
        </Control>
    </Container>
    )
}

export default Devices