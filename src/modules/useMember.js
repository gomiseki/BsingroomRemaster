import{useState, useRef} from "react";
import {User} from './user'

export default function useMember(initialUser){

    const [memberState, setMembers] = useState([initialUser.ID]);
    const memberRef = useRef([]);
    memberRef.current = [initialUser];

    const pushRef = async(newUser)=>{
        memberRef.current.push(newUser)
        return memberRef
    }
    const setMember = async(memberData,user,joined) => {

        const idList = memberRef.current.map(x => x.ID)
        const dataIdList = memberData.map(x=>x.id)
        if(idList.length<dataIdList.length){
            for(const member of memberData){
                if(!(member.id in idList) && member.id != user.ID ){
                    await pushRef(new User(member.icon, member.nickname, member.id))
                    memberRef.current.slice(-1)[0].setConnection(user, joined)
                    setMembers([...memberState, member.id])
                    console.log(memberRef)
                    }
                }
        }else if(idList.length>dataIdList.length){
            for(const member of memberRef.current){
                if(!member.id in dataIdList){
                    member.connection.close();
                    member.audioCtx.close();
                    delete memberRef.current[memberRef.current.findIndex(member)]
                    setMembers(memberState.filter(id => id!=member.id))
                    }
                }
        }
    }
    return [memberState, memberRef, setMember]
}