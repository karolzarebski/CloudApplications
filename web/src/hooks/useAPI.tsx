//routes
//[videos]
//get_all_data
//get_by_id
import {useState} from "react";


interface useApiProps {
    path: "get_all" | "get_by_id" | "videos",
}



export default function useAPI(props: useApiProps) {
    let path = preparePath(props.path);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    console.log(path);

    let get = async () => {
        setLoading(true);
        let data = await fetch(baseURL+path);
        console.log(data);
        //parse object from JSON
        let objTemp = await data.json();
        setResult(() => objTemp)
    }
    function preparePath(candidate:string){
        return candidate.charAt(0) === "/"? candidate.substring(1) : candidate;
    }

    return {result, loading}
}