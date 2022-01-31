import{useState, useRef} from "react";

export default function useSongs(){

    const [songURLs, setSongURLs] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [now, setNow] = useState('');

    return [songURLs, setSongURLs, playing, setPlaying, now, setNow]
}