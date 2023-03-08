import {Button, Select, Table} from "antd";
import VideosTable from "./videosTable";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ControlledVideosTable() {
    const [keywords, setKeywords] = useState<{ label: string, value: string }[]>([]);
    const [res, setRes] = useState();
    const [load, setLoad] = useState(false);
    const [loadKeywords, setLoadKeywords] = useState(false);

    async function getData(newPath: string) {
        await setLoad(true);
        const baseURL = process.env.REACT_APP_API;
        let results = await fetch(baseURL + newPath);
        let objTemp = await results.json();
        await setRes(() => objTemp);
        await setLoad(false);
    }

    async function getKeywords() {
        setLoadKeywords(true);
        try {
            const data = await axios.get(`${process.env.REACT_APP_API}/keywords`)
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
        <div style={{float: "left"}}>
            Wybierz kategorię: &nbsp; &nbsp;
            <Select style={{minWidth: "350px", marginBottom: "15px"}} options={keywords}
                    onSelect={(selected) => getData(`/video/${selected}`)}/>
        </div>
        <VideosTable loading={load} dataSource={res == undefined ? [] : res}/>
    </div>
}
