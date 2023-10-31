// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Tag, Typography } from "antd";
import * as St from "./ExaminerTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import Search from "antd/es/input/Search";
import toast, { Toaster } from "react-hot-toast";

const ExaminerTable = () => {
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
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            }
        },
        {
            title: "Email",
            width: "25%",
            render: (record) => {
                return <Typography>{record.email}</Typography>;
            }
        },
        {
            title: "Name",
            width: "20%",
            render: (record) => {
                return <Typography>{record.name}</Typography>;
            }
        },
        {
            title: "Role",
            width: "15%",
            render: (record) => {
                let color = record.length > 5 ? "volcano" : "geekblue";
                if (record.role === "admin") {
                    color = "volcano";
                } else if (record.role === "ctv") {
                    color = "green";
                }
                return (
                    <Tag color={color} key={record.id}>
                        {/* {role.toUpperCase()} */}
                    </Tag>
                );
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (role) => {
                let color = "magenta";
                if (role === "active") {
                    color = "geekblue";
                }
                return (
                    <Tag color={color} key={role}>
                        {/* {role.toUpperCase()} */}
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

ExaminerTable.propTypes = {};

export default ExaminerTable;
