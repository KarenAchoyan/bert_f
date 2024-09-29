import React, {useEffect, useState} from 'react';
import {Button, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteSlide, getSlides, updateSlide, updateSlideInterval} from "../../../store/slides/actions";
import {deleteGallery, getGalleries} from "../../../store/gallery/actions";

const {Option} = Select;

const All = () => {
    const dispatch = useDispatch();
    const galleries = useSelector((state) => state?.gallery?.galleries);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);


    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);


    useEffect(() => {
        dispatch(getGalleries.request());
    }, [dispatch]);


    const handleDeleteCategory = (id) => {
        dispatch(deleteGallery.request(id));
        message.success('Gallery deleted successfully');
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
                </Space>
            ),
        },
    ];



    return (
        <App>
            <h1>All Slides</h1>
            <div style={{margin: '24px'}}>
                <Table dataSource={galleries} columns={columns} rowKey="id"/>
            </div>
        </App>
    );
};

export default All;