import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteSlide, getSlides, updateSlide, updateSlideInterval} from "../../../store/slides/actions";

const {Option} = Select;

const AllCategoryPage = () => {
    const dispatch = useDispatch();
    const slides = useSelector((state) => state?.slide?.slides);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);


    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        dispatch(getSlides.request());
    }, [dispatch]);


    const handleDeleteCategory = (id) => {
        dispatch(deleteSlide.request(id));
        message.success('Product deleted successfully');
    };

    function handleEditCategory(id) {
        const slide = slides.find((slide) => slide.id === id);
        setEditingProduct(slide);
        setAvatarPreview(process.env.IMAGE_URL2 + slide.image)
        form.setFieldsValue({
            title: slide.title,
            content: slide.content
        });
        setEditModalVisible(true);
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
                    <Image preview={false} src={process.env.IMAGE_URL2 + image} style={{width: '150px'}} alt=""/>
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
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDeleteCategory(id)}
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
                        onClick={() => handleEditCategory(id)}
                        key={`edit_${id}`}
                    >
                        Edit
                    </Button>

                </Space>
            ),
        },
    ];

    function handlerSubmit(values) {
        const formData = new FormData();
        formData.append('image', avatarFile);
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('id', editingProduct.id);

        dispatch(updateSlide.request({id: editingProduct.id, formData}));
        message.success('Slide successfully updated!');
    }

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


    return (
        <App>
            <h1>All Slides</h1>

            <div style={{margin: '24px'}}>

                <Table dataSource={slides} columns={columns} rowKey="id"/>
                <Modal
                    title="Edit Product"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handlerSubmit}>
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
                                        src={avatarPreview}
                                        alt="Avatar"
                                        preview={false}
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
                </Modal>
            </div>
        </App>
    );
};

export default AllCategoryPage;