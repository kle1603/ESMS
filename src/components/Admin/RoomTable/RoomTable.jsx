// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Select, Tag, Typography } from "antd";
import * as St from "./RoomTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/input/Search";
import ButtonAdd from "@/components/ButtonAdd";
// import { item } from "@/layouts/AdminLayout/AdminLayout.items";

const RoomTable = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);

    const fetchData = () => {
        instance
            .get("rooms")
            .then((res) => {
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: item.id,
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Room Number",
            width: "20%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
            sorter: (a, b) => a.roomNum - b.roomNum,
        },
        {
            title: "Location",
            width: "25%",
            render: (record) => {
                return <Typography>{record.location}</Typography>;
            },
        },
        {
            title: "Status",
            width: "25%",
            render: (record) => {
                let color = "geekblue";
                if (record.status === 1) {
                    color = "magenta";
                }
                return (
                    <Tag color={color} key={record.id}>
                        {record.status === 1 ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                );
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) =>
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
                const { roomNumber, location } = values;
                console.log(values);
                instance
                    .post("rooms", { roomNum: roomNumber, location })
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

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

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

    const location = [
        {
            value: 1,
            label: "XAVALO",
        },
        {
            value: 2,
            label: "NVH",
        },
    ];

    const layout = {
        labelCol: {
            span: 7,
        },

        labelAlign: "left",

        wrapperCol: {
            span: 24,
        },
    };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <St.SpaceStyled>
                <Search onSearch={handleSearch} />
            </St.SpaceStyled>

            <ButtonAdd setModalVisible={setModalVisible} title="Add new room" />
            <Modal
                title="Add a room"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="add_row_form"
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                    <Form.Item
                        {...layout}
                        name="roomNumber"
                        label="Room Number"
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
                        <Input placeholder="Room Number" allowClear />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        {...layout}
                        rules={[
                            {
                                required: true,
                                message: "Please chose a location",
                            },
                        ]}
                    >
                        <Select options={location} />
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <St.StyledTable
                    bordered
                    dataSource={data}
                    columns={columns}
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
