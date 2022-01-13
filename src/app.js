import React,{ createContext, useState } from 'react';
import{ HashRouter, Route, Routes} from 'react-router-dom';
import Intro from './components/intro/intro';
import Lobby from './components/lobby/lobby';
//import Room from './components/room/room'


export const UserDispatch = createContext(null);

function App(){
    var [user, setUser] = useState(null);

    return(
        <HashRouter>
          <UserDispatch.Provider value={{user,setUser}}>
            <Routes>
              <Route path="/" element={<Intro/>}/>     
              <Route path="/lobby" element={<Lobby/>}/>
            </Routes>
          </UserDispatch.Provider>
        </HashRouter>
    )
}
export default App
//<Route path="/room" element={<Room/>}/>