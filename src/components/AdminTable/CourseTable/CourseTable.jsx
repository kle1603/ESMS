import { Form, Input, InputNumber, Modal, Popconfirm, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./CourseTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/input/Search";

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

const CourseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            courseCode: "MAE101",
            numOfStudents: 120,
            status: "Active",
        },
        {
            key: 2,
            no: 2,
            courseCode: "PRN301",
            numOfStudents: 230,
            status: "Active",
        },
        {
            key: 3,
            no: 3,
            courseCode: "SWP301",
            numOfStudents: 180,
            status: "Active",
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            numOfStudents: "",
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

            console.log(newData);
            console.log(row);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");

                instance
                    .put("courses", {
                        id: key,
                        numOfStu: row.numOfStudents,
                    })
                    .then(() => {
                        fetchData();
                    })
                    .catch((error) => {
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

    const fetchData = () => {
        instance
            .get("courses")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    no: item.courseId,
                    subjectCode: item.subCode,
                    subjectName: item.subName,
                    numOfStudents: item.numOfStu,
                    key: item.courseId,
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
            .delete("courses", { data: { id: e } })
            .then((res) => {
                console.log(res);
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error deleted!");
            });
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;
                instance
                    .post("courses", { startTime, endTime })
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

    const handleSearch = (e) => {
        setSearch(e);
    };

    const columns = [
        // Your columns
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
        },
        {
            title: "Course Code",
            dataIndex: "courseCode",
            width: "20%",
        },
        {
            title: "Num of Students",
            dataIndex: "numOfStudents",
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
            width: "15%",
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
            <St.SpaceStyled>
                <Search onSearch={handleSearch} />
            </St.SpaceStyled>
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
                        name="subjectCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject code!",
                            },
                        ]}
                    >
                        <Input placeholder="Subject code" />
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
                    </Form.Item>{" "}
                    <Form.Item
                        name="numOfStudents"
                        rules={[
                            {
                                required: true,
                                message: "Please input the Num of Students!",
                            },
                        ]}
                    >
                        <Input placeholder="Num of Students" />
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

export default CourseTable;
