import {Button, Select, Table} from "antd";
import VideosTable from "./videosTable";
import {useEffect, useState} from "react";
import useAPI from "../../hooks/useAPI";

export default function ControlledVideosTable() {
    const [keywords, setKeywords] = useState<{ label: string, value: string }[]>([]);
    const [res, setRes] = useState();
    const [load, setLoad] = useState(false);

    let [result, loading, get] = useAPI({path: "keywords"});

    async function getData(newPath: string) {
        await setLoad(true);
        const baseURL = "http://127.0.01:5000/";
        let results = await fetch(baseURL + newPath);
        let objTemp = await results.json();
        await setRes(() => objTemp);
        await setLoad(false);
    }


    // let {data, dataLoading, getData} = useAPI("/keywords");

    useEffect(() => {

        if (result != undefined) {
            setKeywords((result as []).map((record: any) => {
                return {
                    label: record.Keyword,
                    value: record.Keyword
                }
            }));
        }
    }, [result])

    return <div>
        <Button onClick={() => get("/keywords")}>Click</Button>
        <Select style={{minWidth: "350px"}} options={keywords}
                onSelect={(selected) => getData(`/video//${selected}`)}/>
        <VideosTable loading={load} dataSource={res == undefined ? [] : res}/>
    </div>
}
