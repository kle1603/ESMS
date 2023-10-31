import {
    Form,
    Input,
    Modal,
    Popconfirm,
    Tag,
    TimePicker,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

import * as St from "./SemesterTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";

const SemesterTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            no: 1,
            start: "20-04",
            end: "25-04",
        },
    ]);
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
            title: "Season",
            width: "20%",
            render: (record) => {
                return <Typography>{record.season}</Typography>;
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
                console.log(res);
                const formattedData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item, index) => ({
                        ...item,
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

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const format = "HH:mm";
    const handleOnChange = (time, timeString) => {
        console.log(time.format("HH:mm"), timeString);
    };

    // const layout = {
    //     labelCol: { span: 6 },
    //     wrapperCol: { offset: 0, span: 18 },
    // };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new Semester"
            />
            <Modal
                title="Add new Semester"
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
                        className="form__item"
                        style={{ width: "100%" }}
                        name="season"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of Season!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Season
                            </Typography>
                            <Input
                                className="form__input"
                                placeholder="Season"
                            />
                        </St.FlexStyled>
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
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Start Time
                            </Typography>
                            <TimePicker
                                className="form__input"
                                format={format}
                                minuteStep={15}
                                onChange={handleOnChange}
                            />
                        </St.FlexStyled>
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
                        <St.FlexStyled>
                            <Typography className="form__title">
                                End Time
                            </Typography>
                            <TimePicker
                                className="form__input"
                                format={format}
                                minuteStep={15}
                                onChange={handleOnChange}
                            />
                        </St.FlexStyled>
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
