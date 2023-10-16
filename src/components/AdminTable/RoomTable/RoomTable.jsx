// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Table, Tag, Typography } from "antd";
import * as St from "./RoomTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/input/Search";

const RoomTable = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);

    const text = "khong co note gi ca";

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
            sorter: (a, b) => a.roomNumber - b.roomNumber,
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: "25%",
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
            // dataIndex: "note",
            key: "note",
            width: "35%",
            // render: (record) => <Tag color="green">{text.toUpperCase()}</Tag>,
            render: (record) => {
                console.log(record);
                return record.note.length > 0 ? (
                    record.note
                ) : (
                    <Tag color="green">{text.toUpperCase()}</Tag>
                );
            },
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "20%",
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

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { roomNumber, location, note } = values;
                console.log(values);
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
                    key: item.roomNum,
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
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                    showSizeChanger: false,
                }}
            />
        </St.DivTable>
    );
};

RoomTable.propTypes = {};

export default RoomTable;
