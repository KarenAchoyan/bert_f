import React, {useEffect, useState} from 'react';
import {Form, Input, Checkbox, Select, Button, message, Upload, Image} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {addGallery} from "../../../store/gallery/actions";


const Add = () => {
    const dispatch = useDispatch();
    const isAdding = useSelector(state => state.gallery.isAdding);
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
        dispatch(addGallery.request(formData));
        form.resetFields();
        setAvatarFile(null)
        setAvatarPreview("")
        message.success('Gallery successfully added!');
    };

    return (
        <App>
            <h1>Add Gallery</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                        {!isAdding ? "Submit" : "Uploading..."}
                    </Button>
                </Form.Item>
            </Form>
        </App>
    );
};

export default Add;