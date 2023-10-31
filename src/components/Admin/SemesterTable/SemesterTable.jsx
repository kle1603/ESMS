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
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Season",
            width: "20%",
            render: (record) => {
                return <Typography>{record.season}</Typography>;
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.start}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.end}</Typography>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record.end);

                if (currentDate > endTime) {
                    return <Tag color="red">CLOSED</Tag>;
                } else {
                    return <Tag color="green">ON GOING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record.end);

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
                // console.log(res);
                const formattedData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item, index) => ({
                        ...item,
                        no: index + 1,
                        key: item.id,
                        season: item.season + " " + item.year,
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
                const { season, start, end } = values;
                // console.log(values);
                instance
                    .post("semesters", { season, start, end })
                    .then((res) => {
                        console.log(res);
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
                Add a semester
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
                        name="start"
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
                        name="end"
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
