import {Button, Table} from "antd";
import {useEffect} from "react";
import {ColumnsType} from "antd/es/table";
import VideoEditForm from "../videoAddForm/videoEditForm";

export const testDataSource:any = [
    {
        Id: 1,
        Key: 1,
        Title: "1",
        PublishedAt:"12-12-2022",
        Keyword:"a",
        Likes:1213,
        Comments:1231,
        Views:123123
    },
    {
        Id: 2,
        Key: 2,
        Title: "asdfasdf1",
        PublishedAt:"12-08-2022",
        Keyword:"aasdfsaf",
        Likes:51213,
        Comments:11,
        Views:12313423
    },
]

export interface DataSourceProps {
    id: number,
    key: number,
    title: string,
    publishedAt: string,
    keyword: string,
    likes: number,
    comments: number,
    views: number,
    avg_likes_comments_views_per_day?: number
}

interface columnProps {
    title: string,
    dataIndex: string,
    key: string
}

interface VideosTableProps {
    dataSource?: DataSourceProps[],
    loading: boolean,
    withAvg?: boolean,
    refreshList?:any;
}

export default function VideosTable(props: VideosTableProps) {

    const onEditClicked = (record: DataSourceProps) => {
        console.log(record);
    }

    const columns: ColumnsType<DataSourceProps> = [
        {title: "Id", dataIndex: "id", key: "id"},
        {title: "Tytuł", dataIndex: "title", key: "title"},
        {title: "Dodano", dataIndex: "publishedAt", key: "publishedAt"},
        {title: "Słowo kluczowe", dataIndex: "keyword", key: "keyword"},
        {title: "Polubienia", dataIndex: "likes", key: "likes"},
        {title: "Komentarze", dataIndex: "comments", key: "comments"},
        {title: "Wyświetlenia", dataIndex: "views", key: "views"},
        {
            title: "Edytuj",
            dataIndex: "x",
            key: "x",
            render: (value, record, idx) => <VideoEditForm initValues={record} refreshList={props.refreshList}/>
        },
    ];

    const columnsWithAvg: ColumnsType<DataSourceProps> = [
        {title: "Id", dataIndex: "id", key: "id"},
        {title: "Tytuł", dataIndex: "title", key: "title"},
        {
            title: "Dodano", dataIndex: "publishedAt", key: "publishedAt",
            render: (value, record, index) =>
                <span>{(new Date(value)).getFullYear().toString() + "/" + (new Date(value)).getMonth().toString() + "/" + (new Date(value)).getDate().toString()} </span>
        },
        {title: "Słowo kluczowe", dataIndex: "keyword", key: "keyword"},
        {title: "Polubienia", dataIndex: "likes", key: "likes"},
        {title: "Komentarze", dataIndex: "comments", key: "comments"},
        {title: "Wyświetlenia", dataIndex: "views", key: "views"},
        {
            title: "Średnia aktywność na dzień",
            dataIndex: "avg_likes_comments_views_per_day",
            key: "avg_likes_comments_views_per_day"
        }
    ]

    const xd: DataSourceProps[] | undefined = props.dataSource?.map((record: any, idx) => {
        if (!props.withAvg) {
            return {
                id: record.Id,
                key: idx,
                title: record.Title,
                publishedAt: record.PublishedAt,
                keyword: record.Keyword,
                likes: record.Likes,
                comments: record.Comments,
                views: record.Views
            } as DataSourceProps
        } else {
            return {
                id: record.Id,
                key: idx,
                title: record.Title,
                publishedAt: record.PublishedAt,
                keyword: record.Keyword,
                likes: record.Likes,
                comments: record.Comments,
                views: record.Views,
                avg_likes_comments_views_per_day: record.avg_likes_comments_views_per_day
            } as DataSourceProps
        }
    })

    return <Table loading={props.loading} dataSource={xd} columns={props.withAvg ? columnsWithAvg : columns}
                  pagination={{pageSize: 5}}/>
}

