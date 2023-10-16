// import PropTypes from "prop-types";
import {
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Tag,
    Typography,
} from "antd";
import * as St from "./RoomTable.styled";
import { useEffect, useState } from "react";
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

const RoomTable = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState("");

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "10%",
        },
        {
            title: "Room Number",
            dataIndex: "roomNumber",
            key: "roomNumber",
            width: "20%",
            editable: true,
            sorter: (a, b) => a.roomNumber - b.roomNumber,
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: "25%",
            editable: true,
            filters: [
                {
                    text: "XAVALO",
                    value: "XAVALO",
                },
                {
                    text: "NVH",
                    value: "NVH",
                },
            ],
            onFilter: (value, record) => record.location === value,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            width: "25%",
            editable: true,
            render: (text) => {
                return text.length > 0 ? (
                    <St.TagStyled color="red">
                        {text.toUpperCase()}
                    </St.TagStyled>
                ) : (
                    <Tag color="green">
                        {"khong co note gi ca".toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "20%",
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

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            note: "",
            location: "",
            roomNumber: "",
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

                console.log(row);
                console.log(key);

                instance
                    .put("rooms", {
                        id: key,
                        note: row.note,
                        roomNum: row.roomNumber,
                        location: row.location,
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

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { roomNumber, location, note } = values;
                instance
                    .post("rooms", { roomNum: roomNumber, location, note })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("Error created!");
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

    const fetchData = () => {
        instance
            .get("rooms")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    no: item.id,
                    roomNumber: item.roomNum,
                    key: item.id,
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
            .delete("rooms", { data: { roomNum: e } })
            .then(() => {
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                toast.error("Error deleted!");
                console.log(error);
            });
    };

    const handleSearch = (e) => {
        setSearch(e);
    };

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
                        name="roomNumber"
                        rules={[
                            {
                                required: true,
                                message: "Please input a room number!",
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: "Invalid room number!",
                            },
                        ]}
                    >
                        <Input placeholder="Room Number" />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: "Please input a location!",
                            },
                            {
                                pattern: /^(NVH|XAVALO)$/,
                                message: "Invalid location!",
                            },
                        ]}
                    >
                        <Input placeholder="Location" />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        rules={[
                            {
                                required: false,
                                message: "Please input a note!",
                            },
                        ]}
                    >
                        <Input placeholder="Note" />
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

RoomTable.propTypes = {};

export default RoomTable;
