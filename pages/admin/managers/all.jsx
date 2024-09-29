import React, {useEffect, useState} from 'react';
import {Button, Table, Modal, Form, Input, Upload, Image, message, notification} from 'antd';
import {EditOutlined, DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, getBlogs, searchBlogs, updateBlog} from "../../../store/blog/actions";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {deleteManager, getManagers, updateManager} from "../../../store/manager/actions";

const ReactQuill = dynamic(import('react-quill'), {ssr: false})

const AllBlogPage = () => {
    const managers = useSelector((state) => state.manager.managers);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);

    const dispatch = useDispatch();


    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);


    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getManagers.request());
    }, [dispatch]);

    const handleDeleteBlog = () => {
        dispatch(deleteManager.request(selectedBlog.id));
        setDeleteModalVisible(false);
    };

    const handleEditBlog = (blog) => {
        form.setFieldsValue({
            fullname: blog?.fullname,
            content: blog?.content,
        })
        setAvatarPreview(process.env.IMAGE_URL+blog?.image)
        setSelectedBlog(blog);
        setEditModalVisible(true);
    };

    const handleEditFormSubmit = (values) => {
        const formData = new FormData();
        formData.append('fullname', values.fullname);
        formData.append('content', values.content);

        formData.append('image', avatarFile);

        formData.append('id', selectedBlog.id)

        dispatch(updateManager.request({formData, id: selectedBlog.id}));

        setEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Name, Surname',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, blog) => (
                <div>
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => handleEditBlog(blog)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined/>}
                        onClick={() => {
                            setSelectedBlog(blog);
                            setDeleteModalVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];



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

    function UploadImages() {
        return (
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
        )
    }


    return (
        <App>
            <Table columns={columns} dataSource={managers} rowKey="id"/>

            <Modal
                title="Delete Blog"
                visible={isDeleteModalVisible}
                onOk={handleDeleteBlog}
                onCancel={() => setDeleteModalVisible(false)}
            >
                <p>Are you sure you want to delete this blog?</p>
            </Modal>

            <Modal
                title="Edit Blog"
                visible={isEditModalVisible}
                onOk={() => setEditModalVisible(false)}
                onCancel={() => setEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setEditModalVisible(false)}>
                        Cancel
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    name="edit-blog-form"
                    onFinish={handleEditFormSubmit}
                    initialValues={{
                        fullname: selectedBlog?.fullname || '',
                        content: selectedBlog?.content || '',
                    }}
                >
                    <Form.Item
                        name="fullname"
                        label="Name, Surname"
                        rules={[{required: true, message: 'Please enter the name and surname'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <UploadImages/>
                    <Form.Item label="Content" name="content">
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </App>
    );
};

export default AllBlogPage;