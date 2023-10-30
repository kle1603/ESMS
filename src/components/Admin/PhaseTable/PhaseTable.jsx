import {
    DatePicker,
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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                console.log(record);
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "15%",
            render: (record) => {
                return <Typography>{record.ePName}</Typography>;
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.startDay}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.endDay}</Typography>;
            },
        },
        {
            title: "Type",
            width: "15%",
            render: (record) => {
                if (record.des === 0) {
                    return <Tag color="red">NORMAL</Tag>;
                } else {
                    return <Tag color="green">COURSERA</Tag>;
                }
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record);

                if (currentDate > endTime) {
                    return <Tag color="red">FINISHED</Tag>;
                } else {
                    return <Tag color="green">PENDING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record);

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

    const option = [
        { value: "Coursera", label: "Coursera" },
        { value: "Normal", label: "Normal" },
    ];

    const fetchData = () => {
        instance
            .get(`examPhases/${semesterId}`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
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

    const fetchSemester = () => {
        instance
            .get("semesters")
            .then((res) => {
                const semestersData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item) => ({
                        label: item.season + " " + item.year,
                        value: item.id,
                    }));
                setSemesterId(semestersData[0].value);
                setSelectSemester(semestersData[0].label);
                setSemesters(semestersData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    const handleDelete = (e) => {
        setLoading(true);
        instance
            .delete("examPhases", { data: { id: e } })
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

    const handleSelect = (id, option) => {
        setSelectSemester(option.label);
        setSemesterId(id);
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
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
