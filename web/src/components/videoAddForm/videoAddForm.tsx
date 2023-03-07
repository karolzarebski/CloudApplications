import {useState} from "react";
import {Button, Checkbox, Form, Input} from 'antd';
import {InputNumber} from "antd/lib";


export default function VideoAddForm() {

    const onFinish = (values: any) => {

        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <Form
        name="addVideoForm"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Tytuł"
            name="Title"
            rules={[{required: true, message: 'Podaj tutuł'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Słowo kluczowe"
            name="Keyword"
            rules={[{required: false}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Polubienia"
            name="Likes"
            rules={[{required: false}]}
        >
            <InputNumber min={0} defaultValue={0}/>
        </Form.Item>

        <Form.Item
            label="Komentarze"
            name="Comments"
            rules={[{required: false}]}
        >
            <InputNumber min={0} defaultValue={0}/>
        </Form.Item>

        <Form.Item
            label="Wyświetlenia"
            name="Views"
            rules={[{required: false}]}
        >
            <InputNumber min={0} defaultValue={0}/>
        </Form.Item>


        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
                Dodaj
            </Button>
        </Form.Item>
    </Form>
}
