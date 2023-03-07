//routes
//[videos]
//get_all_data
//get_by_id
import {useEffect, useState} from "react";

export interface useApiProps {
    path: "get_all" | "get_by_id" | "videos"|"keywords"
}


export default function useAPI(props: useApiProps) {
    let path = preparePath(props.path);
    console.log(path);
    const baseURL = "http://192.168.1.9:5000/";
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    //fetch on create
    useEffect(()=>{
        //get(path);d
    },[])

    async function get(newPath: string|null|undefined){
        await setLoading(true);

        if(newPath){path = preparePath(newPath);}
        console.log(baseURL + path);
        let results = await fetch(baseURL + path);
        console.log(results);
        //parse object from JSON
        console.log(await results.text())
        let objTemp = await results.json();

        await setResult(() => objTemp);

        await setLoading(false);
    }

    function preparePath(candidate: string) {
        return candidate.charAt(0) === "/" ? candidate.substring(1) : candidate;
    }

    return {result, loading, get}
}