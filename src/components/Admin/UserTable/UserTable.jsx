// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Select, Tag, Typography } from "antd";
import * as St from "./UserTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import Search from "antd/es/input/Search";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";

const UserTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState();
    const [page, setPage] = useState();

    const columns = [
        {
            title: "No",
            // key: "no",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Email",
            // key: "email",
            width: "25%",
            render: (record) => {
                return <Typography>{record.email}</Typography>;
            },
        },
        {
            title: "Name",
            // key: "name",
            width: "20%",
            render: (record) => {
                return <Typography>{record.name}</Typography>;
            },
        },
        {
            title: "Role",
            key: "role",
            width: "15%",
            render: (record) => {
                let color = record.role.length > 5 ? "volcano" : "geekblue";
                if (record.role === "admin") {
                    color = "volcano";
                }
                return (
                    <Tag color={color} key={record.id}>
                        {record.role.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Status",
            // key: "status",
            width: "15%",
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
            width: "15%",
            render: (record) =>
                data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.id)}
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
                // console.log(values.role);
                // console.log(values.email);
                // console.log(values.name);
                // console.log(values);
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

    // const handleAdd = () => {
    //     setModalVisible(true);
    // };

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

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const role = [
        {
            value: 1,
            label: "Admin",
        },
        {
            value: 2,
            label: "Staff",
        },
        {
            value: 3,
            label: "Lecturer",
        },
    ];

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <St.SpaceStyled>
                <Search allowClear onSearch={handleSearch} />
            </St.SpaceStyled>

            <ButtonAdd setModalVisible={setModalVisible} title="Add new user" />
            <Modal
                title="Add new user"
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
                        label="Role"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please choose role!",
                            },
                        ]}
                    >
                        <Select options={role} />
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input allowClear placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        {...layout}
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" allowClear />
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
