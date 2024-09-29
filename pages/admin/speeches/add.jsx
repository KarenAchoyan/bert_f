import React, {useState} from 'react';
import {Form, Input, Button, message, Upload, Image} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {addSpeech} from "../../../store/speech/actions";

const Add = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const isAdding = useSelector((state) => state.speech?.isAdding);

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
        dispatch(addSpeech.request(formData));
        form.resetFields();
        setAvatarFile(null);
        setAvatarPreview("");
        message.success('Speech successfully added!');
    };

    return (
        <App>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="YouTube Link"
                    name="youtubeLink"
                    rules={[{required: true, message: 'Please enter the YouTube link'}]}
                >
                    <Input placeholder="Enter the YouTube Link"/>
                </Form.Item>

                {/* Avatar Upload */}
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
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        )}
                    </Upload>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Form.Item>
                        <Button loading={isAdding} type="primary" htmlType="submit" disabled={isAdding}>
                            {isAdding ? 'Adding...' : 'Add'}
                        </Button>
                    </Form.Item>
                </Form.Item>
            </Form>
        </App>
    );
};

export default Add;
