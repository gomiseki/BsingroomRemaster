import{useState, useRef} from "react";
import {User} from './user'

export default function useMember(initialUser){

    const [memberState, setMembers] = useState([initialUser.ID]);
    const memberRef = useRef([initialUser]);

    const pushRef = async(newUser, user, joined)=>{
        newUser.setConnection(user, joined)
        memberRef.current.push(newUser)
        return memberRef
    }
    const setMember = async(memberData,user,joined) => {

        const idList = memberRef.current.map(x => x.ID)
        const dataIdList = memberData.map(x=>x.id)
        console.log(idList, dataIdList)
        if(idList.length<dataIdList.length){
            for(const member of memberData){
                console.log(!(member.id in idList) && member.id != user.ID)
                if(!(member.id in idList) && member.id != user.ID ){
                    await pushRef(new User(member.icon, member.nickname, member.id),user, joined)
                    console.log(memberRef.current[memberRef.current.length-1])
                    setMembers(dataIdList)
                    
                    }
                }
        }else if(idList.length>dataIdList.length){
            for(const member of memberRef.current){
                if(!dataIdList.includes(member.ID)){
                    console.log(memberRef.current,dataIdList,String(member.ID) )
                    member.connection.close();
                    memberRef.current.splice(memberRef.current.indexOf(member),1)
                    console.log(dataIdList)
                    setMembers(dataIdList)
                    }
                }
        }
    }
    return [memberState, memberRef, setMember]
}