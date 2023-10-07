import { Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";

import * as St from "./SlotTable.styled";
import instance from "@/utils/instance";

const SlotTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        // Your columns
        {
            title: "Slot",
            dataIndex: "slot",
            width: "25%",
            editable: true,
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            width: "25%",
            editable: true,
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            width: "25%",
            editable: true,
        },

        {
            title: "Operation",
            dataIndex: "operation",
        },
    ];

    const fetchData = () => {
        instance
            .get("/timeSlots/getAll")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                    slot: item.id,
                    startTime: item.startTime.slice(0, 5),
                    endTime: item.endTime.slice(0, 5),
                }));
                setLoading(false);
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;
                instance
                    .post("/timeSlots/create", { startTime, endTime })
                    .then(() => {
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        console.log(error);
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
                        ]}
                    >
                        <Input placeholder="Start time" />
                    </Form.Item>
                    <Form.Item
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input the end time!",
                            },
                        ]}
                    >
                        <Input placeholder="End time" />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: data.length <= 5,
                }}
            />
        </St.DivTable>
    );
};

export default SlotTable;
