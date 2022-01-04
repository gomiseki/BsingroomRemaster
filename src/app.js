import React from 'react';
import{ HashRouter, Route, Routes} from 'react-router-dom';
import Intro from './components/intro/intro';
import Lobby from './components/lobby/lobby';
//import Room from './components/room/room'

function App(){
    return(
        <HashRouter>
          <Routes>
            <Route path="/" element={<Intro/>}/>     
            <Route path="/lobby" element={<Lobby/>}/>
          </Routes>
        </HashRouter>
    )
}
export default App
//<Route path="/lobby" element={<Lobby/>}/>
//<Route path="/room" element={<Room/>}/>