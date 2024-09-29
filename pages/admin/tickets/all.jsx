import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import App from "../layouts/app";
import {useDispatch, useSelector} from "react-redux";
import {deleteTicket, getTickets, updateTicket} from "../../../store/ticket/actions";
import moment from 'moment';

const {RangePicker} = DatePicker;

const AllTicketsPage = () => {
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state?.ticket?.tickets);

    const [editingTicket, setEditingTicket] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getTickets.request());
    }, [dispatch]);

    const handleDeleteTicket = (id) => {
        dispatch(deleteTicket.request(id));
        message.success('Ticket deleted successfully');
    };

    function handleEditTicket(id) {
        const ticket = tickets.find((ticket) => ticket.id === id);
        setEditingTicket(ticket);
        form.setFieldsValue({
            title: ticket.title,
            url: ticket.url,
            date: moment(ticket.date),
        });
        setEditModalVisible(true);
    }

    function handleSubmit(values) {
        const {date, ...rest} = values;

        const formData = new FormData();
        formData.append('date', date.format('YYYY-MM-DD'))
        formData.append('url', values.url)
        formData.append('title', values.title)
        dispatch(updateTicket.request({formData, id:editingTicket.id}));
        message.success('Ticket successfully updated!');
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <Space size="small">
                    <Popconfirm
                        title="Are you sure you want to delete this ticket?"
                        onConfirm={() => handleDeleteTicket(id)}
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
                        onClick={() => handleEditTicket(id)}
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
            <h1>All Tickets</h1>
            <div style={{margin: '24px'}}>
                <Table dataSource={tickets} columns={columns} rowKey="id"/>
                <Modal
                    title="Edit Ticket"
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{required: true, message: 'Please enter the title'}]}
                        >
                            <Input placeholder="Enter the title"/>
                        </Form.Item>
                        <Form.Item
                            label="URL"
                            name="url"
                            rules={[{required: true, message: 'Please enter the URL'}]}
                        >
                            <Input placeholder="Enter the URL"/>
                        </Form.Item>
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{required: true, message: 'Please select the date'}]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
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

export default AllTicketsPage;
