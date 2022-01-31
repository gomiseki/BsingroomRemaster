import React,{useState} from "react";
import styled from 'styled-components';
import CustomButton from "../btn";

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
const Worning = styled.input`
    width: 100%;
    margin: 10px 0;
    color: red;
    border: none;
    background: transparent;
`
function RoomCreate({user,navigate, volume}){

    const [inputs, setInputs] = useState({
        roomname: '',
    });
    const [warning, setWarning] = useState('');
    const { roomname } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onCreate = () => {        //'방만들기' 클릭 시 실행
        if(roomname != ''){
            user.host = true;
            user.joinRoom("room_"+roomname)
            navigate('/room',{replace:true, state:{volume:volume}})
        }
        else{
            setWarning('roomname을 입력해주세요.')
        }
    };

    return( 
    <Container>
        <Label>Room Create</Label>
        <div style={{flex:"10", paddingTop:"20px", display:'flex', flexDirection:'column'}}>
            <div style={{diaplay:"flex"}}>
                <input style={{width:"60%", height:"25px",
                            border:"none",  marginRight: '10px', borderRadius:"5px"}}
                    name="roomname"
                    placeholder="방제"
                    onChange={onChange}
                    value={roomname}/>
                <CustomButton onClick={onCreate}>방 만들기</CustomButton>
            </div>
            <Worning value={warning}/>
        </div>
    </Container>
    )
}

export default RoomCreate