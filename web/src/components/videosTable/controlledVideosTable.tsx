import {Table} from "antd";
import VideosTable from "./videosTable";
import {useEffect, useState} from "react";
import useAPI from "../../hooks/useAPI";

export default function ControlledVideosTable(props: VideosTableProps) {
    const [keywords, setKeywords] = useState<string>();
    const [selected, setSelectedKeyword] = useState<string>();
    let {keywordResults, keywordLoading, getKeywords} = useAPI("/keywords");

    useEffect(()=>{
        console.log(keywordResults);
        
    },[keywordResults])


    return <VideosTable dataSource={props.dataSource} loading={}/>
}