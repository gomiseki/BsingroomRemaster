import{ HashRouter, Route, Routes} from 'react-router-dom';
import Intro from './component/intro/intro';
import Lobby from './component/lobby/lobby';
import Room from './component/room/room'

function App(){
    return(
        <HashRouter>
          <Routes>
            <Route path="/" element={<Intro/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/room" element={<Room/>}/>
          </Routes>
        </HashRouter>
    )
}
export default App