import React, {useEffect, useState} from 'react';
import {Form, Input, Checkbox, Select, Button, message, Upload, Image} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {addSlide} from "../../../store/slides/actions";


const Add = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);


    const handleAvatarChange = async (info) => {
        const file = info.fileList[0].originFileObj;
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
        formData.append('image', values.avatar.file);
        formData.append('title', values.title);
        formData.append('content', values.content);

        dispatch(addSlide.request(formData));
        form.resetFields();
        setAvatarFile(null)
        setAvatarPreview("")
        message.success('Slide successfully added!');
    };

    return (
        <App>
            <h1>Add Slide</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Title"
                    name="title"
                >
                    <Input placeholder="Enter the Title"/>
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                >
                    <Input placeholder="Enter the Content"/>
                </Form.Item>
                <Form.Item label="Avatar" name="avatar">
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={() => false}
                        fileList={avatarFile ? [avatarFile] : []}
                        onChange={handleAvatarChange}
                        name={'avatar'}
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
        </App>
    );
};

export default Add;