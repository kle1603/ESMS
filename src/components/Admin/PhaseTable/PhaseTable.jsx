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
import ButtonAdd from "@/components/ButtonAdd";

const { RangePicker } = DatePicker;

const PhaseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);

    const option = [
        { value: "Coursera", label: "Coursera" },
        { value: "Normal", label: "Normal" },
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
                return <Typography>{record.startDay}</Typography>;
            },
        },
        {
            title: "End Day",
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

    const fetchData = () => {
        setLoading(true);
        // console.log(semesterId);

        if (semesterId !== 0) {
            instance
                .get(`examPhases/${semesterId}`)
                .then((res) => {
                    const formattedData = res.data.data.map((item, index) => ({
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
        wrapperCol: {
            offset: 5,
            span: 19,
        },
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

            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new phase"
            />

            <Modal
                title="Add new phase"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="add_row_form"
                >
                    <St.FormItemStyled
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the Name!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Name
                            </Typography>
                            <Input
                                allowClear
                                placeholder="Name"
                                className="form__input"
                                // style={{ fontFamily: "Signika !important"}}
                            />
                        </St.FlexStyled>
                    </St.FormItemStyled>
                    <St.FormItemStyled
                        name="option"
                        rules={[
                            {
                                required: true,
                                message: "Please select the option!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Option
                            </Typography>
                            <Select
                                className="form__input"
                                options={option}
                                defaultValue={option[1].value}
                            />
                        </St.FlexStyled>
                    </St.FormItemStyled>
                    <St.FormItemStyled
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Please select the Range Time!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Range
                            </Typography>
                            <RangePicker className="form__input" />
                        </St.FlexStyled>
                    </St.FormItemStyled>
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
