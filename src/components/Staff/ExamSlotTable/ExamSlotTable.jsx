// import PropTypes from "prop-types";

import { Button, Divider, Form, Input, Modal, Table } from "antd";

import * as St from "./ExamSlotTable.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";

const ExamSlotTable = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        instance
            .get(`examSlots/1`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Day",
            width: "30%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
        },
        {
            title: "Start Time",
            width: "20%",
            render: (record) => {
                console.log(record.timeSlot.startTime);

                return <div>{record.timeSlot.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "20%",
            render: (record) => {
                return <div>{record.timeSlot.endTime}</div>;
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        style={{ background: "#5194f2" }}
                        onClick={() => handleEdit(record)}
                    >
                        Detail
                    </Button>
                );
            },
        },
    ];

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleOk = () => {};

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleEdit = (e) => {
        navigate(configs.routes.staff + `/examSlot/${e.no}`);
        console.log(e);
    };

    return (
        <div>
            <Divider orientation="left">Range: 1/10/2023 - 8/10/2023</Divider>

            <St.DivTable>
                <St.ButtonTable
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={handleAdd}
                >
                    Add a row
                </St.ButtonTable>
                <Modal
                    title="Add a row"
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} name="add_row_form">
                        <Form.Item
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose role!",
                                },
                                {
                                    pattern:
                                        /^(Admin|admin|ADMIN|Staff|staff|Lecturer|lecturer)$/,
                                    message: "Invalid role!",
                                },
                            ]}
                        >
                            <Input placeholder="Role" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the email!",
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the name!",
                                },
                            ]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table bordered columns={columns} dataSource={data} />
            </St.DivTable>
        </div>
    );
};

ExamSlotTable.propTypes = {};

export default ExamSlotTable;
