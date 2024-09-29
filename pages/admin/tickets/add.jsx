import React from 'react';
import {Button, DatePicker, Form, Input, message} from 'antd';
import App from "../layouts/app";
import {useDispatch} from "react-redux";
import {addTicket} from "../../../store/ticket/actions";


const AddTicketPage = () => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const formData = {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
        };
        dispatch(addTicket.request(formData));
        message.success('Ticket successfully added!');
        form.resetFields();
    };

    return (
        <App>
            <h1>Add New Ticket</h1>
            <div style={{margin: '24px'}}>
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
                            Add Ticket
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </App>
    );
};

export default AddTicketPage;
