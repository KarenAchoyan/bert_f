import React, {useEffect, useState} from 'react';
import {Button, Form, message, Upload, Image, Input} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from '../layouts/app';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';
import {getContent, updateContent} from "../../../store/content/actions";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import axios from "axios";

const ReactQuill = dynamic(import('react-quill'), {ssr: false});

const AddCostumePage = () => {
    const dispatch = useDispatch();

    const [form2] = Form.useForm();
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const content = useSelector(state => state.content.content)
    const isAdding = useSelector((state) => state.content?.isUpdating);

    useEffect(() => {
        dispatch(getContent.request({id: 1}))
    }, [dispatch])


    useEffect(() => {
        if (content) {
            form2.setFieldsValue({
                content: content.content,
                youtubeLink: content.video,
            });

        }
    }, [content, form2]);


    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('content', values.content);
        formData.append('youtubeLink', values.youtubeLink);

        dispatch(updateContent.request({id: 1, formData}))
    };



    return (
        <App>
            <div style={{margin: '24px'}}>
                <Form form={form2} onFinish={handleSubmit}>
                    <Form.Item name="content">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item
                        label="YouTube Link"
                        name="youtubeLink"
                        rules={[{required: true, message: 'Please enter the YouTube link'}]}
                    >
                        <Input placeholder="Enter the YouTube Link"/>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isAdding} type="primary" htmlType="submit" disabled={isAdding}>
                            {isAdding ? 'Adding...' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </App>
    );
};

export default AddCostumePage;
