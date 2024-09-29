import React, {useEffect, useState} from 'react';
import {Button, Form, message, Upload, Image} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from '../layouts/app';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import {getContent, updateContent} from "../../../store/content/actions";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {addStudioImage} from "../../../store/studio/actions";

const ReactQuill = dynamic(import('react-quill'), {ssr: false});

const Update = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const content = useSelector(state => state.content.content)

    useEffect(() => {
        dispatch(getContent.request({id: 2}))
    }, [dispatch])


    useEffect(() => {
        if (content) {
            form2.setFieldsValue({
                content: content.content,
                video: content.video,
            });

            setAvatarPreview(process.env.IMAGE_URL + content.image);
        }
    }, [content, form]);



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


    function handleUpdate(values) {
        const formData = new FormData();
        formData.append('image', avatarFile);
        formData.append('content', values.content);

        dispatch(updateContent.request({id: 2, formData}))
        message.success('Costume successfully added!');

    }

    return (
        <App>
            <div style={{margin: '24px'}}>
                <Form form={form2} onFinish={handleUpdate}>
                    <Form.Item name="content">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item name="video"
                               rules={[{required: true, message: 'Please upload a video'}]}>
                        <Form.Item name="avatar">
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
                        <br/>
                        {avatarPreview ? (
                            <img src={process.env.IMAGE_URL+avatarPreview} alt=""/>
                        ) : null}
                    < /Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </App>
    );
};

export default Update;
