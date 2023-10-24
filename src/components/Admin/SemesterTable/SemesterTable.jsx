import { Form, Input, Modal, Popconfirm, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./SemesterTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";

const SemesterTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            startTime: "1/10/2023",
            endTime: "1/1/2024",
            season: "Fall 2023",
        },
        {
            key: 2,
            no: 2,
            startTime: "1/5/2023",
            endTime: "1/9/2023",
            season: "Summer 2023",
        },
        {
            key: 3,
            no: 3,
            startTime: "20/10/2022",
            endTime: "10/1/2023",
            season: "Spring 2023",
        },
        {
            key: 4,
            no: 4,
            startTime: "1/5/2022",
            endTime: "1/9/2022",
            season: "Fall 2022",
        },
        {
            key: 5,
            no: 5,
            startTime: "20/10/2022",
            endTime: "10/1/2022",
            season: "Summer 2022",
        },
        {
            key: 6,
            no: 6,
            startTime: "1/5/2022",
            endTime: "1/9/2022",
            season: "Spring 2022",
        },
    ]);
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
            title: "Start Time",
            dataIndex: "startTime",
            width: "15%",
            editable: true,
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            width: "15%",
            editable: true,
        },
        {
            title: "Season",
            dataIndex: "season",
            width: "20%",
            editable: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "15%",
            render: (text, record) => {
                const currentDate = new Date();
                const endTime = new Date(record.endTime);

                if (currentDate > endTime) {
                    return <Tag color="red">CLOSED</Tag>;
                } else {
                    return <Tag color="green">ON GOING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "15%",
            render: (_, record) => {
                const currentDate = new Date();
                const endTime = new Date(record.endTime);

                if (currentDate > endTime) {
                    return (
                        <Typography.Link disabled>
                            Can not delete
                        </Typography.Link>
                    );
                } else {
                    return (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link>Delete</Typography.Link>
                        </Popconfirm>
                    );
                }
            },
        },
    ];

    const fetchData = () => {
        instance
            .get("semesters")
            .then((res) => {
                console.log(res)
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
                    .post("semesters", { season })
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
                title="Add new Semester"
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
                                message: "Please input the name of Season!",
                            },
                        ]}
                    >
                        <Input placeholder="Season" />
                    </Form.Item>
                    <Form.Item
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input the Start Time!",
                            },
                        ]}
                    >
                        <Input placeholder="Start Time" />
                    </Form.Item>
                    <Form.Item
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please input the End Time!",
                            },
                        ]}
                    >
                        <Input placeholder="End Time" />
                    </Form.Item>
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
