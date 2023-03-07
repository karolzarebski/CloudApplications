//routes
//[videos]
//get_all_data
//get_by_id
import {useEffect, useState} from "react";

export interface useApiProps {
    path: "get_all" | "get_by_id" | "videos",
}


export default function useAPI(props: useApiProps) {
    let path = preparePath(props.path);
    console.log(path);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    //fetch on create
    useEffect(()=>{
        get(path);
    },[])

    async function get(newPath: string|null|undefined){
        await setLoading(true);

        if(newPath){path = preparePath(newPath);}
        console.log(baseURL + path);
        let data = await fetch(baseURL + path);
        console.log(data);
        //parse object from JSON
        let objTemp = await data.json();
        await setResult(() => objTemp);

        await setLoading(false);
    }

    function preparePath(candidate: string) {
        return candidate.charAt(0) === "/" ? candidate.substring(1) : candidate;
    }

    return {result, loading, get}
}