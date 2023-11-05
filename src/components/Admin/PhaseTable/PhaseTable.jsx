import {
    Button,
    DatePicker,
    Form,
    Input,
    Popconfirm,
    Select,
    Tag,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

import * as St from "./PhaseTable.styled";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";
import ExcelFile from "@/components/ExcelFile";

const PhaseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const pageSize = 10;

    const option = [
        { value: 0, label: "Normal" },
        { value: 1, label: "Coursera" },
    ];

    const columns = [
        // Your columns
        {
            title: "No",
            width: "5%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "20%",
            render: (record) => {
                return <Typography>{record.ePName}</Typography>;
            },
        },
        {
            title: "Start Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.sDay}</Typography>;
            },
        },
        {
            title: "End Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.eDay}</Typography>;
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
                if (record.status === true) {
                    return <Tag color="green">PENDING</Tag>;
                } else {
                    return <Tag color="default">CLOSED</Tag>;
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

    const fetchData = () => {
        setLoading(true);
        // console.log(semesterId);

        if (semesterId !== 0) {
            instance
                .get(`examPhases/${semesterId}`)
                .then((res) => {
                    console.log(res.data.data);
                    const formattedData = res.data.data
                        .sort((a, b) => b.id - a.id)
                        .map((item, index) => ({
                            ...item,
                            key: item.id,
                            no: index + 1,
                        }));

                    setData(formattedData);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const fetchSemester = () => {
        // setLoading(true);
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
            .finally(() => {});
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
                console.log(values.name);
                console.log(values.option);
                console.log(startDay);
                console.log(endDay);

                instance
                    .post("examPhases", {
                        ePName: values.name,
                        des: values.option,
                        startDay: startDay,
                        endDay: endDay,
                    })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("Error created!");
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

    const handleSelect = (id, option) => {
        console.log(id);
        console.log(semesterId);
        if (id !== semesterId) {
            setData([]);
            setLoading(true);
        }
        setSelectSemester(option.label);
        setSemesterId(id);
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
                <Button type="primary" onClick={handleOk}>
                    Submit
                </Button>
            </>
        );
    };

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
                <ExcelFile />
            </St.StyledLeft>

            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new phase"
            />

            <St.ModalStyled
                title="Add new phase"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter}
            >
                <Form
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="add_row_form"
                >
                    <Form.Item
                        {...layout}
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" allowClear />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Option"
                        name="option"
                        rules={[
                            {
                                required: true,
                                message: "Please select a option!",
                            },
                        ]}
                        initialValue={option[0].value}
                    >
                        <Select options={option} />
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
                        name="end"
                        label="End Day"
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

export default PhaseTable;
