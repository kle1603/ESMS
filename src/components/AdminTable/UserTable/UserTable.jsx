// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Tag, Typography } from "antd";
import * as St from "./UserTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import Search from "antd/es/input/Search";
import toast, { Toaster } from "react-hot-toast";

const UserTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState();
    const [page, setPage] = useState();

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Role",
            key: "role",
            dataIndex: "role",
            width: "20%",
            render: (role) => {
                let color = role.length > 5 ? "geekblue" : "volcano";
                if (role === "lecturer") {
                    color = "magenta";
                }
                return (
                    <Tag color={color} key={role}>
                        {role.toUpperCase()}
                    </Tag>
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

    const fetchData = () => {
        setLoading(true);
        instance
            .get(`users/${search}`, {
                params: { page_no: page, limit: 5 },
            })
            .then((res) => {
                console.log(res);
                if (res.data.data.Data) {
                    setTotal(res.data.data.Total);
                    const formattedData = res.data.data.Data.map((item) => ({
                        ...item,
                        key: item.email,
                        no: item.id,
                    }));
                    setData(formattedData);
                } else {
                    const formattedData = res.data.data.map((item) => ({
                        ...item,
                        key: item.email,
                        no: item.id,
                    }));
                    setData(formattedData);
                    setTotal(formattedData.length);
                }
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
    }, [search, page]);

    const handleDelete = (e) => {
        setLoading(true);
        instance
            .delete("users", { data: { email: e } })
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
                const { role, email, name } = values;
                instance
                    .post("users", { role, email, name })
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

    const handleChange = (page) => {
        setPage(page);
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
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please choose role!",
                            },
                            {
                                pattern:
                                    /^(Admin|admin|ADMIN|Staff|staff|Lecturer|lecturer)$/,
                                message: "Invalid role!",
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
            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: data.length <= 5,
                    showSizeChanger: false,
                    total: total,
                    showQuickJumper: true,
                    onChange: handleChange,
                }}
            />
        </St.DivTable>
    );
};

UserTable.propTypes = {};

export default UserTable;
