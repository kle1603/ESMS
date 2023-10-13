import { Form, Input, Modal, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./SemesterTable.styled";
import instance from "@/utils/instance";

const SemesterTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        // Your columns
        {
            title: "No",
            dataIndex: "no",
            width: "25%",
            editable: true,
        },
        {
            title: "Season",
            dataIndex: "season",
            width: "25%",
            editable: true,
        },
        {
            title: "Year",
            dataIndex: "year",
            width: "25%",
            editable: true,
        },

        {
            title: "Operation",
            dataIndex: "operation",
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
        instance
            .get("semesters")
            .then((res) => {
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    season: item.season,
                    no: index + 1,
                    key: item.id,
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
            .delete("semester", { data: { id: e } })
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
                const { season, year } = values;
                // console.log(values);
                instance
                    .post("semesters", { season, year })
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

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

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
                        name="season"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of Season !",
                            },
                        ]}
                    >
                        <Input placeholder="Season" />
                    </Form.Item>
                    <Form.Item
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: "Please input the year !",
                            },
                        ]}
                    >
                        <Input placeholder="Year" />
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
                }}
            />
        </St.DivTable>
    );
};

export default SemesterTable;
