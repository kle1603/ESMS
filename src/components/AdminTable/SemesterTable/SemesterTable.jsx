import { Form, Input, Modal, Popconfirm, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./SemesterTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";

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
            width: "10%",
            editable: true,
        },
        {
            title: "Time",
            dataIndex: "time",
            width: "20%",
            editable: true,
        },
        {
            title: "Season",
            dataIndex: "season",
            width: "25%",
            editable: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "20%",
            render: (text, record) => {
                const currentYear = new Date().getFullYear();
                const year = record.year;

                if (year === currentYear) {
                    return <Tag color="green">On Going</Tag>;
                } else if (year < currentYear) {
                    return <Tag color="red">Past</Tag>;
                } else {
                    return "Upcoming";
                }
            },
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "15%",
            render: (_, record) => {
                const currentYear = new Date().getFullYear();
                const year = record.year;
                const status =
                    year === currentYear
                        ? "On Going"
                        : year < currentYear
                        ? "Past"
                        : "Upcoming";

                if (status === "Past") {
                    return (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link>Can not delete</Typography.Link>
                        </Popconfirm>
                    );
                }

                return (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                );
            },
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
        console.log(e);
        instance
            .delete("semesters", { data: { id: e } })
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
                const { season } = values;
                // console.log(values);
                instance
                    .post("semesters", { season})
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

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
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
                    {/* <Form.Item
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: "Please input the year !",
                            },
                        ]}
                    >
                        <Input placeholder="Year" />
                    </Form.Item> */}
                </Form>
            </Modal>
            <St.StyledTable
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
