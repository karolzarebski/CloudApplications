import React, {useEffect, useState} from 'react';
import './App.css';
import useAPI, {useApiProps} from "./hooks/useAPI";
import VideosTable from "./components/videosTable/videosTable";
import {Button} from "antd";
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
            <VideosTable dataSource={videos == undefined ? [] : videos} loading={videosLoading}/>
            <ControlledVideosTable/>
            <VideosTable withAvg={true} dataSource={videosWithAvg == undefined ? [] : videosWithAvg} loading={videosAvgLoading}/>

            <VideoAddForm/>

        </div>
    );
}

export default App;
