import React, {useState} from 'react';
import {Form, Input, Upload, Button, message, Image} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {addBlog} from "../../../store/blog/actions";
import {useDispatch} from "react-redux";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {ssr: false})

const AddBlogPage = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const normFile = (e) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage || Upload.LIST_IGNORE;
    };
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
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('image', values.avatar.file);

        dispatch(addBlog.request(formData));
        form.resetFields();
        setAvatarFile("")
        setAvatarPreview("")
        message.success('Blog successfully added!');
    };


    return (
        <App>
            <h1>Add Blog</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Title" name="title" rules={[{required: true, message: 'Please enter the title'}]}>
                    <Input placeholder="Enter the title"/>
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
                <Form.Item label="Content" name="content">
                    <ReactQuill/>
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

export default AddBlogPage;