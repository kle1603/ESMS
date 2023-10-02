// SlotTable.js
import { Form, Modal, Popconfirm, Typography } from "antd";
import { useState } from "react";
import { EditableTable } from "./EditableTable";
import { AddRowModal } from "./AddRowModal";

import * as St from "./SlotTable.styled";

const SlotTable = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [count, setCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([
        // Your initial data
    ]);

    const edit = (record) => {
        form.setFieldsValue({ season: "", year: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setDataSource(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                Modal.confirm({
                    title: "Bạn có chắc chắn không?",
                    onOk: () => {
                        form.resetFields();
                        const newData = {
                            key: count,
                            ...values,
                        };
                        setDataSource([...dataSource, newData]);
                        setCount(count + 1);
                        setModalVisible(false);
                    },
                    onCancel() {
                        // Không làm gì khi người dùng nhấn hủy
                    },
                });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
                // Không đóng modal nếu có lỗi
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const isEditing = (record) => record.key === editingKey;

    const columns = [
        // Your columns
        {
            title: "Slot",
            dataIndex: "slot",
            width: "20%",
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
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link
                                style={{ marginLeft: 8, display: "inline" }}
                            >
                                Delete
                            </Typography.Link>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    return (
        <St.DivTable>
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Add a row
            </St.ButtonTable>
            <AddRowModal
                visible={modalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                form={form}
            />
            <EditableTable
                dataSource={dataSource}
                form={form}
                editingKey={editingKey}
                isEditing={isEditing}
                columns={columns}
            />
        </St.DivTable>
    );
};

export default SlotTable;
