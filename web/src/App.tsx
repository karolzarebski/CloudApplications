import React, {useEffect} from 'react';
import './App.css';
import useAPI, {useApiProps} from "./hooks/useAPI";
import VideosTable from "./components/videosTable/videosTable";
import {Button} from "antd";
import ControlledVideosTable from "./components/videosTable/controlledVideosTable";
import VideoAddForm from "./components/videoAddForm/videoAddForm";


function App() {
    let [result, loading, get] = useAPI({path: "videos"});
    let [res, load, getAvg] = useAPI({path:"stats"})

    useEffect(()=>{
    },[])

    return (
        <div className="App">
            <VideosTable dataSource={result == undefined ? [] : result} loading={loading}/>
            <Button onClick={() => {
                get("/videos")
            }}>Get all</Button>

            <ControlledVideosTable/>
            <VideoAddForm/>

            <VideosTable withAvg={true} dataSource={res == undefined ? [] : res} loading={load}/>
            <Button onClick={() => {
                get("/stats")
            }}>Get all</Button>
        </div>
    );
}

export default App;
