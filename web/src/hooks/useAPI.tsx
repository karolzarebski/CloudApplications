//routes
//[videos]
//get_all_data
//get_by_id
import {useEffect, useState} from "react";

export interface useApiProps {
    path: "get_all" | "get_by_id" | "videos" | "keywords"
}

export default function useAPI(props: useApiProps) {
    let path = preparePath(props.path);

    const baseURL = "http://127.0.01:5000/";
    const [result, setResult] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    async function get(newPath: string) {
        await setLoading(true);

        let results = await fetch(baseURL + newPath);

        let objTemp = await results.json();

        await setResult(() => objTemp);

        await setLoading(false);
    }

    function preparePath(candidate: string) {
        return candidate.charAt(0) === "/" ? candidate.substring(1) : candidate;
    }

    return [result, loading, get]
}
