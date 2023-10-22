// import PropTypes from "prop-types";
import { Form, Input, InputNumber, Modal, Popconfirm, Typography } from "antd";

import * as St from "./SubjectTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const SubjectTable = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            semester: 5,
            subjectName: "Toan roi rac",
            subjectCode: "MAE101",
            status: "Active",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            fe: "",
            pe: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");

                instance
                    .put("subjects", {
                        id: key,
                    })
                    .then(() => {
                        toast.success("Successfully updated!");
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("This is an error!");
                        console.log(error);
                    });
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const fetchData = () => {
        instance
            .get("subjects")
            .then((res) => {
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    semester: item.semesterNo,
                    subjectName: item.name,
                    key: item.id,
                    id: item.id,
                }));
                setData(formattedData);
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
        instance
            .delete("subjects", { data: { id: e } })
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
                    .post("subjects", { startTime, endTime })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("This is an error!");
                        console.log(error);
                    });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
        },
        {
            title: "Subject Name",
            dataIndex: "subjectName",
            width: "25%",
        },
        {
            title: "Subject Code",
            dataIndex: "subjectCode",
            width: "25%",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "15%",
            editable: true,
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "10%",
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

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
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
                        name="semester"
                        rules={[
                            {
                                required: true,
                                message: "Please input the semester!",
                            },
                        ]}
                    >
                        <Input placeholder="Semester" />
                    </Form.Item>
                    <Form.Item
                        name="subjectName"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject name!",
                            },
                        ]}
                    >
                        <Input placeholder="Subject Name" />
                    </Form.Item>
                    <Form.Item
                        name="subjectCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject code!",
                            },
                        ]}
                    >
                        <Input placeholder="Subject Code" />
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <St.StyledTable
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    scroll={{ x: true }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 6,
                        hideOnSinglePage: data.length <= 6,
                        showSizeChanger: false,
                    }}
                    loading={loading}
                />
            </Form>
        </St.DivTable>
    );
};

SubjectTable.propTypes = {};

export default SubjectTable;
