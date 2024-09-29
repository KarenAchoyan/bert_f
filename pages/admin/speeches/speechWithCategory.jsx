import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message, Upload, Image, Table, Space, Popconfirm, Select} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {addSpeech} from "../../../store/speech/actions";
import {
    addSpeechWithCategory,
    deleteSpeechWithCategory,
    getSpeechesWithCategories
} from "../../../store/speechWithCategory/actions";
import {getSpeechCategories} from "../../../store/speechCategory/actions";

const {Option} = Select;

const Add = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const speeches = useSelector(state => state.speechWithCategory?.speechesWithCategories)
    const categories = useSelector(state => state.speechCategory?.speechCategories)

    useEffect(() => {
        dispatch(getSpeechesWithCategories.request());
        dispatch(getSpeechCategories.request());
    }, [dispatch])

    const handleAvatarChange = async (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (file instanceof Blob) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('url', values.youtubeLink);
        formData.append('image', avatarFile);
        formData.append('category_id', values.category_id);
        dispatch(addSpeechWithCategory.request(formData));
        form.resetFields();
        setAvatarFile(null);
        setAvatarPreview("");
        message.success('Speech successfully added!');
    };
    function handleDeleteSpeech(id){
        dispatch(deleteSpeechWithCategory.request({id}));
        message.success('Speech successfully deleted!');
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    {image ?
                        <Image preview={false} src={process.env.IMAGE_URL2 + image} style={{width: '150px'}} alt=""/>
                        :null
                    }
                </div>
            ),
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
                </Space>
            ),
        }
    ];

    return (
        <App>
            <h1>Add Speech</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="YouTube Link"
                    name="youtubeLink"
                    rules={[{required: true, message: 'Please enter the YouTube link'}]}
                >
                    <Input placeholder="Enter the YouTube Link"/>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[{required: true, message: 'Please select a category'}]}
                >
                    <Select placeholder="Select a category">
                        {categories?.map((item) => (
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Avatar" name="avatar">
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleAvatarChange}
                        name="avatar"
                    >
                        {avatarPreview ? (
                            <Image
                                preview={false}
                                src={avatarPreview}
                                alt="Avatar"
                                style={{maxWidth: '100%', maxHeight: '200px'}}
                            />
                        ) : (
                            <Button icon={<UploadOutlined/>}>Upload Avatar</Button>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Table dataSource={speeches} columns={columns} rowKey="id"/>

        </App>
    );
};

export default Add;
