import {
    Form,
    Input,
    Popconfirm,
    DatePicker,
    Tag,
    Typography,
    Button,
} from "antd";
import { useEffect, useState } from "react";

import * as St from "./SemesterTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";

const SemesterTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const pageSize = 10;

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
            title: "Start Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.start}</Typography>;
            },
        },
        {
            title: "End Day",
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
                const startDay = new Date(record.start);
                const endDay = new Date(record.end);

                if (currentDate <= startDay) {
                    return <Tag color="blue">FUTURE</Tag>;
                } else if (currentDate > endDay) {
                    return <Tag color="red">CLOSED</Tag>;
                } else {
                    return <Tag color="green">ON-GOING</Tag>;
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
                console.log(res);
                const formatttedData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                        season: item.season + " " + item.year,
                    }));
                setData(formatttedData);
            })
            .catch((err) => {
                console.log(err);
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
            .then((res) => {
                console.log(res);
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
                const newValue = values.season
                    .toUpperCase()
                    .replaceAll(" ", "_");
                instance
                    .post("semesters/whenCreateSemester", {
                        season: newValue,
                        start: startDay,
                        end: endDay,
                    })
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

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
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
    const onChangeStart = (_, date) => {
        setStartDay(date);
    };
    const onChangeEnd = (_, date) => {
        setEndDay(date);
    };

    const modalFooter = () => {
        return (
            <>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                    /*loading={buttonOk}*/ onClick={handleOk}
                    type="primary"
                >
                    Submit
                </Button>
            </>
        );
    };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new semester"
            />
            <St.ModalStyled
                title="Add new semester"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter()}
            >
                <Form
                    form={form}
                    name="add_row_form"
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                    <Form.Item
                        {...layout}
                        label="Season"
                        name="season"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of Season!",
                            },
                        ]}
                    >
                        <Input allowClear placeholder="Ex: Fall 2023" />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        name="start"
                        label="Start Day"
                        rules={[
                            {
                                required: true,
                                message: "Please select the start day!",
                            },
                        ]}
                    >
                        <DatePicker
                            onChange={onChangeStart}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="End Day"
                        name="end"
                        rules={[
                            {
                                required: true,
                                message: "Please select the end day!",
                            },
                        ]}
                    >
                        <DatePicker
                            onChange={onChangeEnd}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
            <St.StyledTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </St.DivTable>
    );
};

export default SemesterTable;
