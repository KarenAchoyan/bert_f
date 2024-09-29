import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, message, Modal, Popconfirm, Space, Table, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {getSpeeches, deleteSpeech, updateSpeech} from "../../../store/speech/actions";

const AllSpeechesPage = () => {
    const dispatch = useDispatch();
    const speeches = useSelector((state) => state.speech.speeches);

    const [editingSpeech, setEditingSpeech] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        dispatch(getSpeeches.request());
    }, [dispatch]);

    const handleDeleteSpeech = (id) => {
        dispatch(deleteSpeech.request(id));
        message.success('Speech deleted successfully');
    };


    function handleEditSpeech(id) {
        const speech = speeches.find((speech) => speech.id === id);
        setEditingSpeech(speech);
        setAvatarPreview(process.env.IMAGE_URL2 + speech.image);
        form.setFieldsValue({
            youtubeUrl: speech.video
        });
        setEditModalVisible(true);
    }

    function handleSubmit(values) {
        const formData = new FormData();
        formData.append('image', avatarFile);
        formData.append('youtubeUrl', values.youtubeUrl);
        formData.append('id', editingSpeech.id);

        dispatch(updateSpeech.request({id: editingSpeech.id, formData}));
        message.success('Speech successfully updated!');
    }

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
                    <Image preview={false} src={process.env.IMAGE_URL2 + image} style={{width: '150px'}} alt=""/>
                </div>
            ),
        },
        {
            title: 'YouTube URL',
            dataIndex: 'video',
            key: 'video',
            render: (url) => (
                <a href={"https://www.youtube.com/watch?v="+url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            )
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
            <h1>All Speeches</h1>
            <div style={{margin: '24px'}}>
                <Table dataSource={speeches} columns={columns} rowKey="id"/>
                <Modal
                    title="Edit Speech"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="YouTube URL"
                            name="youtubeUrl"
                            rules={[{required: true, message: 'Please enter the YouTube URL'}]}
                        >
                            <Input placeholder="Enter the YouTube URL"/>
                        </Form.Item>
                        <Form.Item label="Image" name="image">
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleAvatarChange}
                            >
                                {avatarPreview ? (
                                    <Image
                                        preview={false}
                                        src={avatarPreview}
                                        alt="Speech Image"
                                        style={{maxWidth: '100%', maxHeight: '200px'}}
                                    />
                                ) : (
                                    <Button icon={<UploadOutlined/>}>Upload Image</Button>
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </App>
    );
};

export default AllSpeechesPage;
