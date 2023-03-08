import {Button, Select, Table} from "antd";
import VideosTable from "./videosTable";
import {useEffect, useState} from "react";
import useAPI from "../../hooks/useAPI";
import axios from "axios";

export default function ControlledVideosTable() {
    const [keywords, setKeywords] = useState<{ label: string, value: string }[]>([]);
    const [res, setRes] = useState();
    const [load, setLoad] = useState(false);
    const [loadKeywords, setLoadKeywords] = useState(false);

    async function getData(newPath: string) {
        await setLoad(true);
        const baseURL = "http://127.0.01:5000/";
        let results = await fetch(baseURL + newPath);
        let objTemp = await results.json();
        await setRes(() => objTemp);
        await setLoad(false);
    }

    async function getKeywords() {
        setLoadKeywords(true);
        try {
            const data = await axios.get("http://127.0.0.1:5000/keywords")
            console.log(data.data);
            setKeywords(data.data.map((record: any) => {
                return {
                    label: record.Keyword,
                    value: record.Keyword
                }
            }));
        } catch (e: any) {
            console.log(e)
        }
        setLoadKeywords(false);
    }

    // let {data, dataLoading, getData} = useAPI("/keywords");

    useEffect(() => {
        getKeywords();
    }, [])

    return <div>
        <Select style={{minWidth: "350px"}} options={keywords}
                onSelect={(selected) => getData(`/video//${selected}`)}/>
        <VideosTable loading={load} dataSource={res == undefined ? [] : res}/>
    </div>
}
