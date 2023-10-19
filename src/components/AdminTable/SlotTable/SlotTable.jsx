import { Form, Input, Modal, Popconfirm, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./SlotTable.styled";
import instance from "@/utils/instance";
import toast from "react-hot-toast";

const SlotTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        // Your columns
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
            editable: true,
        },
        {
            title: "Slot",
            dataIndex: "slot",
            width: "20%",
            editable: true,
        },
        {
            title: "Day",
            dataIndex: "day",
            width: "20%",
            editable: true,
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            width: "20%",
            editable: true,
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            width: "20%",
            editable: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "10%",
            editable: true,
        },
        {
            title: "Operation",
            dataIndex: "operation",
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    const fetchData = () => {
        // setLoading(true);
        instance
            .get("timeSlots")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                    no: item.id,
                    slot: item.id,
                    startTime: item.startTime.slice(0, 5),
                    endTime: item.endTime.slice(0, 5),
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e) => {
        setLoading(true);
        instance
            .delete("timeSlots", { data: { id: e } })
            .then(() => {
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                toast.error("Error deleted!");
                console.log(error);
            });
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;
                instance
                    .post("timeSlots", { startTime, endTime })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("Error created!");
                    });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    return (
        <St.DivTable>
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
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
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input the start time!",
                            },
                            {
                                pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                message:
                                    "Please enter a valid time format (HH:mm)!",
                            },
                        ]}
                    >
                        <Input placeholder="Start time" />
                    </Form.Item>
                    <Form.Item
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input the start time!",
                            },
                            {
                                pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                message:
                                    "Please enter a valid time format (HH:mm)!",
                            },
                        ]}
                    >
                        <Input placeholder="End time" />
                    </Form.Item>
                </Form>
            </Modal>
            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                }}
            />
        </St.DivTable>
    );
};

export default SlotTable;
