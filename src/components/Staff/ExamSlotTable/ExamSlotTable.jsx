// import PropTypes from "prop-types";

import { Button, Divider, Form, Input, Modal, Table } from "antd";

import * as St from "./ExamSlotTable.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";

const ExamPhaseTable = () => {
    const { id } = useParams();
    const { state } = useLocation();
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
            .get(`examSlots/${id}`)
            .then((res) => {
                console.log(res.data.data);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                    startTime: item.timeSlot.startTime.slice(0, -3),
                    endTime: item.timeSlot.endTime.slice(0, -3),
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
                return <div>{record.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "20%",
            render: (record) => {
                return <div>{record.endTime}</div>;
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
        // navigate(configs.routes.staff + `/examSlot/${e.id}`);
        console.log(state.data);
        console.log(e);

        navigate(configs.routes.staff + `/examSlot/${e.id}`, {
            state: {
                item:
                    "Day: " +
                    e.day +
                    " Time: " +
                    e.timeSlot.startTime.slice(0, 5) +
                    "-" +
                    e.timeSlot.endTime.slice(0, 5),
            },
        });
    };

    return (
        <div>
            <Divider orientation="left">
                {state.data.ePName +
                    " - " +
                    state.data.startDay +
                    " - " +
                    state.data.endDay}
            </Divider>

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

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
