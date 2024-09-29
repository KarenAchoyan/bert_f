import React, {useEffect} from 'react';
import {Button, DatePicker, Form, Image, Input, message, Popconfirm, Space, Table} from 'antd';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {addTicket} from "../../../store/ticket/actions";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {addSpeechCategory, deleteSpeechCategory, getSpeechCategories} from "../../../store/speechCategory/actions";
import {deleteSpeechWithCategory} from "../../../store/speechWithCategory/actions";


const AddTicketPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.speechCategory.speechCategories)
    const [form] = Form.useForm();

    useEffect(()=>{
        dispatch(getSpeechCategories.request())
    },[dispatch])

    const handleSubmit = (values) => {
        const formData = {
            ...values,
        };
        dispatch(addSpeechCategory.request(formData));
        message.success('Ticket successfully added!');
        form.resetFields();
    };

    function handleDeleteSpeech(id) {
        dispatch(deleteSpeechCategory.request({id}))
        message.success('Ticket successfully deleted!');

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="small">
                    <Popconfirm
                        title="Are you sure you want to delete this speech?"
                        onConfirm={() => handleDeleteSpeech(id)}
                        okText="Yes"
                        cancelText="No"
                        key={`delete_${id}`}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined/>} key={`confirm_${id}`}>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditSpeech(id)}
                        key={`edit_${id}`}
                    >
                        Edit
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <App>
            <h1>Add New Category</h1>
            <div style={{margin: '24px'}}>

                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please enter the name'}]}
                    >
                        <Input placeholder="Enter the title"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Ticket
                        </Button>
                    </Form.Item>
                </Form>

                <Table dataSource={categories} columns={columns} rowKey="id"/>

            </div>

        </App>
    );
};

export default AddTicketPage;
