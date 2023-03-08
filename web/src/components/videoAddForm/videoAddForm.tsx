import {Button, Form, Input, Modal} from 'antd';
import {InputNumber, message} from "antd/lib";
import {useState} from "react";
import axios from "axios";


export default function VideoAddForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: any) => {
        try {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            values.PublishedAt = `${year}-${month}-${day}`;
            await axios.post(`${process.env.REACT_APP_API}/video`, values);
            message.success('Dodano do bazy danych!');
            handleOk();
        } catch (error) {
            message.error('Error: Błąd połączania z API!');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <div>
        <Button type="primary" onClick={showModal} style={{fontSize: "16px"}}>
            Dodaj wideo
        </Button>
        <Modal title="Dodaj wideo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               footer={<Form.Item wrapperCol={{offset: 8, span: 16}}>
                   <Button type="primary" danger onClick={handleCancel}>
                       Anuluj
                   </Button>
                   <Button type="primary" form="submitForm" key="submit" htmlType="submit">
                       Dodaj
                   </Button>
               </Form.Item>}
        >
            <Form
                id="submitForm"
                name="addVideoForm"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                // initialValues={{remember: true}}
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
                    label="Wideo Id"
                    name="VideoId"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Polubienia"
                    name="Likes"
                    rules={[{required: false}]}
                >
                    <InputNumber min={0} style={{width: "100%"}}/>
                </Form.Item>

                <Form.Item
                    label="Komentarze"
                    name="Comments"
                    rules={[{required: false}]}
                >
                    <InputNumber min={0} style={{width: "100%"}}/>
                </Form.Item>

                <Form.Item
                    label="Wyświetlenia"
                    name="Views"
                    rules={[{required: false}]}
                >
                    <InputNumber min={0} style={{width: "100%"}}/>
                </Form.Item>

            </Form>
        </Modal>
    </div>
}
