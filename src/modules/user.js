import {io} from 'socket.io-client'

const ENDPOINT = "localhost:8000";

class User{

    host = false;
    roomInfo = false;
    mediaStream = null;
    constructor(userIcon, nickname){
        this.userIcon = userIcon;
        this.nickname = nickname;
    }
    
}

class Me extends User{

    socket = io.connect(ENDPOINT);

    constructor(userIcon, nickname){
        super(userIcon, nickname);
        this.setMedia();
    }
    
    joinRoom(roomname){
        this.socket.emit('joinRoom',roomname)
        this.roomInfo = roomname;
    }

    setMedia(deviceID){
        navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: false, deviceId:{exact: deviceID} },
            video: false
        }).then((stream)=>{
            this.mediaStream = stream
        })
    }
}

export {User, Me}