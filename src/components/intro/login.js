import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomButton from '../btn';

const Loginform = styled.form`
    width: 400px;
    height: 300px;
    border: 1px solid white;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50px;   
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
    align-items: center;
`
const IconSel = styled.select`
    width:47px;
    height: 37px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-right: 10px;
`
const NameInput = styled.input`
    width: 170px;
    height: 32px;
    border: 1px solid lightgray;
    border-radius: 10px;
`
const Worning = styled.input`
    text-align: center;
    width: 80%;
    margin-bottom: 20px;
    color: red;
    border: none;
    background: transparent;
`

const IconSelect = ({onChange, options}) =>{     //icon select 담당 컴포넌트
    return (
		<IconSel name="icon" onChange={onChange}>
            <option value="" selected disabled hidden ></option>
			{options.map((option) => (
				<option
					value={option}
				>
					{option}
				</option>
			))}
		</IconSel>
	)
}

function Login(){
    const navigate = useNavigate();

    const Icons = ["🐱","🦝","🐺","🦊","🦁","🐯","🐼","🐨","🐻"]    //select태그에 들어갈 option아이콘

    const [worning, setWorning] = useState();   //정보 미입력 시 경고

    const [inputs, setInputs] = useState({
        nickname: '',
        icon:''
      });
    
    const { nickname ,icon } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs,                      // 기존의 input 객체를 복사한 뒤
          [name]: value                   // name 키를 가진 값을 value 로 설정
        });
      };

    const onSubmit = (e) =>{              //완전 입력 시 lobby로 이동
        e.preventDefault();

        if(nickname==="" || icon==="") {
            setWorning("icon을 선택하고 nickname을 입력해주세요.")
        }
        else{
            if(nickname.length>10){
                setWorning("더 짧은 nickname을 입력해주세요.")
            }
            else{ setWorning("입장 중입니다.....")
            navigate('/lobby', {replace:true, state: { nickname : nickname, icon : icon}})
        }
        }
    }

    return (
        <Loginform onSubmit={onSubmit}>
            <p>이모티콘과 닉네임을 입력하세요</p>
            <div style={{margin:"20px"}}>
            <IconSelect name="icon" value={icon} onChange={onChange} options={Icons}></IconSelect>
            <NameInput type="text" name="nickname" placeholder="nickname" value={nickname} onChange={onChange} size="20"/>
            </div>
            <Worning readOnly={true} type="text" value={worning}/>
            <CustomButton type="submit">입장</CustomButton>
        </Loginform>
    )}
export default Login;
