//routes
//[videos]
//get_all_data
//get_by_id
import {useEffect, useState} from "react";

export interface useApiProps {
    path: "get_all" | "get_by_id" | "videos" | "keywords" | "stats"
}

export default function useAPI(props: useApiProps) {
    let path = preparePath(props.path);

    const baseURL = "http://127.0.0.1:5000/";
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    async function get(newPath: string) {
        await setLoading(true);

        let results = await fetch(baseURL + newPath);

        let objTemp = await results.json();

        await setResult(() => objTemp);

        await setLoading(false);
    }

    async function post(path:string,newValue:any){
        console.log("LOL");
        let newPath = preparePath(path);
        console.log(newValue);
        await fetch(`${baseURL}${newPath}`,{
            method: "POST", // or 'PUT'
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newValue),
        });
    }

    function preparePath(candidate: string) {
        return candidate.charAt(0) === '/' ? candidate.substring(1) : candidate;
    }

    return [result, loading, get, post]
}
