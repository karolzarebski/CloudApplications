import React, {useEffect, useState} from 'react';
import './App.css';
import VideosTable from "./components/videosTable/videosTable";
import ControlledVideosTable from "./components/videosTable/controlledVideosTable";
import VideoAddForm from "./components/videoAddForm/videoAddForm";
import axios from "axios";


function App() {

    const [videos, setVideos] = useState<[]>([]);
    const [videosWithAvg, setVideosWithAvg] = useState<[]>([]);
    const [videosLoading, setVideosLoading] = useState<boolean>(false);
    const [videosAvgLoading, setVideosAvgLoading] = useState<boolean>(false);

    const fetchAllVideosData = async () => {
        setVideosLoading(true);
        try {
            const data = await axios.get("http://127.0.0.1:5000/videos")
            setVideos(data.data);
        } catch (e: any) {
            console.log(e)
        }
        setVideosLoading(false);
    }

    const fetchAvgVideosData = async () => {
        setVideosAvgLoading(true);
        try {
            const data = await axios.get("http://127.0.0.1:5000/stats")
            setVideosWithAvg(data.data);
        } catch (e: any) {
            console.log(e)
        }
        setVideosAvgLoading(false);
    }

    useEffect(() => {
        fetchAllVideosData();
        fetchAvgVideosData();
    }, [])

    return (
        <div className="App">
            <div style={{margin: "30px 150px 60px 150px"}}>
                <h1>Tabela wszystkich wpisów:</h1>
                <VideosTable dataSource={videos == undefined ? [] : videos} loading={videosLoading}/>
            </div>
            <div style={{margin: "30px 150px 150px 150px"}}>
                <h1>Tabela wpisów z wybranej kategorii:</h1>
                <ControlledVideosTable/>
            </div>
            <div style={{margin: "30px 150px 150px 150px"}}>
                <h1>Tabela top100 wpisów o największej aktywności/dzień:</h1>
                <VideosTable withAvg={true} dataSource={videosWithAvg == undefined ? [] : videosWithAvg}
                             loading={videosAvgLoading}/>
            </div>
            <h1>Dodaj video:</h1>
            <VideoAddForm/>

        </div>
    );
}

export default App;
