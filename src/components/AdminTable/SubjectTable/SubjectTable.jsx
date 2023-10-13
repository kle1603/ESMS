// import PropTypes from "prop-types";
import {
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Table,
    Typography,
} from "antd";

import * as St from "./SubjectTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";

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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            semester: "",
            numOfStu: "",
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
            .get("courses")
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    no: item.courseId,
                    semester: item.semester,
                    name: item.subName,
                    fe: item.fe,
                    pe: item.pe,
                    key: item.courseId,
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

    const handleDelete = (e) => {
        instance
            .delete("courses", { data: { id: e } })
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;
                instance
                    .post("courses", { startTime, endTime })
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

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
            editable: true,
        },
        {
            title: "Semester",
            dataIndex: "semester",
            width: "15%",
            editable: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "30%",
            editable: true,
        },
        {
            title: "FE",
            dataIndex: "fe",
            width: "15%",
            editable: true,
        },
        {
            title: "PE",
            dataIndex: "pe",
            width: "15%",
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
                        name="fe"
                        rules={[
                            {
                                required: true,
                                message: "Please input the FE time!",
                            },
                        ]}
                    >
                        <Input placeholder="FE time" />
                    </Form.Item>
                    <Form.Item
                        name="pe"
                        rules={[
                            {
                                required: true,
                                message: "Please input the PE time!",
                            },
                        ]}
                    >
                        <Input placeholder="PE time" />
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 7,
                        hideOnSinglePage: data.length <= 7,
                    }}
                    loading={loading}
                />
            </Form>
        </St.DivTable>
    );
};

SubjectTable.propTypes = {};

export default SubjectTable;
