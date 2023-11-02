// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Tag, Typography } from "antd";

import * as St from "./SubjectTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";

const SubjectTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Subject Name",
            width: "30%",
            render: (record) => {
                return <Typography>{record.name}</Typography>;
            },
        },
        {
            title: "Subject Code",
            width: "25%",
            render: (record) => {
                return <Typography>{record.code}</Typography>;
            },
        },
        {
            title: "Status",
            width: "20%",
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
            render: (record) => {
                return (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                );
            },
        },
    ];

    // const handleAdd = () => {
    //     setModalVisible(true);
    // };

    const fetchData = () => {
        setLoading(true);
        instance
            .get("subjects")
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
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e) => {
        instance
            .delete("subjects", { data: { id: e.id } })
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
                const { startTime, endTime } = values;
                instance
                    .post("subjects", { startTime, endTime })
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

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new subject"
            />

            <Modal
                title="Add a subject"
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
                        name="semester"
                        rules={[
                            {
                                required: true,
                                message: "Please input the semester!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Semester
                            </Typography>
                            <Input
                                allowClear
                                className="form__input"
                                placeholder="Semester"
                            />
                        </St.FlexStyled>
                    </Form.Item>

                    <Form.Item
                        name="subjectName"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject name!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Subject Name
                            </Typography>
                            <Input
                                allowClear
                                className="form__input"
                                placeholder="Subject Name"
                            />
                        </St.FlexStyled>
                    </Form.Item>
                    <Form.Item
                        name="subjectCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject code!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Subject Code
                            </Typography>
                            <Input
                                allowClear
                                className="form__input"
                                placeholder="Subject Code"
                            />
                        </St.FlexStyled>
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <St.StyledTable
                    scroll={{ x: true }}
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

SubjectTable.propTypes = {};

export default SubjectTable;
