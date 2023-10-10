// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Table, Tag, Typography } from "antd";
import * as St from "./UserTable.styled";

import { useEffect, useState } from "react";
import instance from "@/utils/instance";

const UserTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);

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
                if (role === "loser") {
                    color = "green";
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

    instance
        .get("users")
        .then((res) => {
            console.log(res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });

    useEffect(() => {
        instance
            .get("users")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                    no: item.id,
                }));
                setLoading(false);
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleOk = () => {
        form.validateFields();
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    // useEffect(() => {
    //     const user = async () => {
    //         try {
    //             const data = await getUser();
    //             console.log(data.data.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     user();
    // }, []);

    return (
        <St.DivTable>
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
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                    showSizeChanger: false,
                    showQuickJumper: true,
                }}
            />
        </St.DivTable>
    );
};

UserTable.propTypes = {};

export default UserTable;
