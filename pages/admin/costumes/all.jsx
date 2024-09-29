import React, {useEffect, useState} from 'react';
import {Button, Form, Image, message, Modal, Popconfirm, Space, Table, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {getCostumes, deleteCostume, updateCostume, addCostume} from "../../../store/costume/actions";

const AllCostumesPage = () => {
    const dispatch = useDispatch();
    const costumes = useSelector((state) => state?.costume?.costumes);
    const isAdding = useSelector((state) => state.costume?.isAdding);

    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(getCostumes.request());
    }, [dispatch]);
    const handleImageChange = async (info) => {
        const file = info.fileList[0]?.originFileObj;
        if (file instanceof Blob) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', imageFile); // Append image
        dispatch(addCostume.request(formData));
        message.success('Costume successfully added!');
        form.resetFields();
        setImagePreview(null);
        setVideoPreview(null);
    };
    const handleDeleteCostume = (id) => {
        dispatch(deleteCostume.request(id));
        message.success('Costume deleted successfully');
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
                    <Image preview={false} src={process.env.IMAGE_URL2 + image} style={{width: '150px'}} alt="Costume"/>
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
                        title="Are you sure you want to delete this costume?"
                        onConfirm={() => handleDeleteCostume(id)}
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
            <div style={{margin: '24px'}}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="image"
                               rules={[{required: true, message: 'Please upload an image'}]}>
                        <Upload
                            accept="image/*"  // Accept only image files
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                        >
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    preview={false}
                                    alt="Costume Image"
                                    style={{maxWidth: '100%', maxHeight: '200px'}}
                                />
                            ) : (
                                <Button icon={<UploadOutlined/>}>Upload Image</Button>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isAdding} type="primary" htmlType="submit" disabled={isAdding}>
                            {isAdding ? 'Adding...' : 'Add Costume'}
                        </Button>
                    </Form.Item>
                </Form>
                <hr/>
                <br/>
                <Table dataSource={costumes} columns={columns} rowKey="id"/>
            </div>
        </App>
    );
};

export default AllCostumesPage;
