import useAPI from "../../hooks/useAPI";
import {Table} from "antd";

export interface dataSourceProps{
    id:number,
    key:string,
    title:string,
    publishedAt:string,
    keyword:string,
    likes:number,
    comments:number,
    views:number
}

interface columnProps{
    title:string,
    dataIndex:string,
    key:string
}

interface VideosTableProps{
    dataSource:dataSourceProps[],
    loading:boolean
}

export default function VideosTable(props:VideosTableProps){
    const columns = [
        {title:"Id",dataIndex:"id",key:"id"},
        {title:"Tytuł",dataIndex:"title",key:"title"},
        {title:"Dodano",dataIndex:"publishedAt",key:"publishedAt"},
        {title:"Słowo kluczowe",dataIndex:"keyword",key:"keyword"},
        {title:"Polubienia",dataIndex:"likes",key:"likes"},
        {title:"Komentarze",dataIndex:"comments",key:"comments"},
        {title:"Wyświetlenia",dataIndex:"views",key:"views"}
    ] as columnProps[];


    return <Table loading={props.loading} dataSource={props.dataSource} columns={columns} pagination={{pageSize:10}}/>
}