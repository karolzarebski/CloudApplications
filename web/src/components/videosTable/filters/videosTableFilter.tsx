// interface VideosTableFilterProps{
//     input:
// }

import {useState} from "react";
import Input from "antd/lib/input/Input";

export default function VideosTableFilter() {
    const [inputString, setInputString] = useState<string>();


    return <Input placeholder="Basic usage"
                  onChange={(val) => setInputString(val.target.value)}
                  value={inputString}/>;
}