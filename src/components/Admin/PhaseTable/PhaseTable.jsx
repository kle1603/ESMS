import {
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Tag,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

import * as St from "./PhaseTable.styled";
import instance from "@/utils/instance";
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

const PhaseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            name: "Dot 1 mua ha",
            startTime: "1/10/2023",
            endTime: "2/10/2023",
            status: "Close",
        },
        {
            key: 2,
            no: 2,
            name: "Dot bo sung lan 1",
            startTime: "3/10/2023",
            endTime: "10/10/2023",
            status: "Active",
        },
        {
            key: 3,
            no: 3,
            name: "Dot bo sung lan 2",
            startTime: "11/10/2023",
            endTime: "16/10/2023",
            status: "Active",
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
            title: "Name",
            dataIndex: "name",
            width: "25%",
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
            title: "Status",
            dataIndex: "status",
            width: "15%",
            editable: true,
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
            width: "20%",
            render: (_, record) => {
                const currentDate = new Date();
                const endTime = new Date(record.endTime);

                if (currentDate > endTime) {
                    return (
                        <Flex
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography.Link disabled>
                                Can not delete
                            </Typography.Link>
                        </Flex>
                    );
                } else {
                    return (
                        <Flex
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => handleDelete(record.key)}
                            >
                                <Typography.Link>Delete</Typography.Link>
                            </Popconfirm>
                        </Flex>
                    );
                }
            },
        },
    ];

    const options = [
        {
            value: "Fall 2023",
            label: "Fall 2023",
        },
        {
            value: "Summer 2023",
            label: "Summer 2023",
        },
        {
            value: "Spring 2023",
            label: "Spring 2023",
        },
        {
            value: "Fall 2022",
            label: "Fall 2022",
        },
        {
            value: "Summer 2022",
            label: "Summer 2022",
        },
    ];

    const option = [
        { value: "Coursera", label: "Coursera" },
        { value: "Normal", label: "Normal" },
    ];

    const fetchData = () => {
        // setLoading(true);
        instance
            .get("timeSlots")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                    no: item.id,
                    slot: item.id,
                    startTime: item.startTime.slice(0, 5),
                    endTime: item.endTime.slice(0, 5),
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
        setLoading(true);
        instance
            .delete("timeSlots", { data: { id: e } })
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
                console.log(values);
                // const { startTime, endTime } = values;
                // instance
                //     .post("timeSlots", { startTime, endTime })
                //     .then(() => {
                //         toast.success("Successfully created!");
                //         form.resetFields();
                //         setModalVisible(false);
                //         fetchData();
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //         toast.error("Error created!");
                //     });
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

    const initialValues = {
        // name: "Phase 1",
        // date: dayjs(),
    };

    const layout = {
        labelCol: {
            // offset: 0,
            // span: 7,
        },
        wrapperCol: {
            span: 12,
            offset: 3,
        },
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    className="select"
                    defaultValue={options[0].value}
                    options={options}
                />
            </St.StyledLeft>
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Add a row
            </St.ButtonTable>

            <Modal
                title="Add new phase"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    style={{ marginTop: 40 }}
                    {...layout}
                    form={form}
                    name="add_row_form"
                    initialValues={initialValues}
                >
                    <div>
                        <Form.Item
                            name="name"
                            label="Phase Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Name!",
                                },
                            ]}
                        >
                            <Input allowClear placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="option"
                            label="Option"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the option!",
                                },
                            ]}
                        >
                            <Select
                                options={option}
                                defaultValue={option[1].value}
                            />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Range"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the Range Time!",
                                },
                            ]}
                        >
                            <RangePicker />
                        </Form.Item>
                    </div>
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

export default PhaseTable;
