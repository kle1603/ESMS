// import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Tag,
    TimePicker,
    Typography,
} from "antd";
import * as St from "./SlotTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import ButtonAdd from "@/components/ButtonAdd";
// import moment from "moment";
// import moment from "moment";

const SlotTable = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const format = "HH:mm";

    // console.log(semesterId);

    // const handleAdd = () => {
    //     setModalVisible(true);
    // };
    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log(values.startTime.format("HH:mm"));
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleDelete = () => {};

    const handleOnChange = (time, timeString) => {
        console.log(time.format("HH:mm"), timeString);
    };

    const fetchData = () => {
        setLoading(true);
        instance
            .get(`timeSlots/semId?semId=${semesterId}`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
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
            .finally(() => {
                setLoading(false);
            });
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

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                // console.log(record);
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "20%",
            render: (record) => {
                return <Typography>Slot {record.id}</Typography>;
            },
        },
        {
            title: "Start Time",
            width: "20%",
            render: (record) => {
                return <Typography>{record.startTime}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "20%",
            render: (record) => {
                return <Typography>{record.endTime}</Typography>;
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
            title: "Operation",
            width: "15%",
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <St.DivSlot>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
            </St.StyledLeft>

            <ButtonAdd setModalVisible={setModalVisible} title="Add new slot" />

            <Modal
                title="Add new slot"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ fontFamily: "Roboto Slab" }}
                form={form}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="name"
                        label={
                            <span style={{ fontFamily: "Roboto Slab" }}>
                                Slot Name
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please input your name",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input your slot name"
                            style={{ fontFamily: "Roboto Slab" }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="startTime"
                        label={
                            <span style={{ fontFamily: "Roboto Slab" }}>
                                Start Time
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please choose start time!",
                            },
                        ]}
                    >
                        <TimePicker
                            format={format}
                            minuteStep={15}
                            onChange={handleOnChange}
                            style={{ fontFamily: "Roboto Slab" }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="endTime"
                        label={
                            <span style={{ fontFamily: "Roboto Slab" }}>
                                End Time
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Please choose end time!",
                            },
                        ]}
                    >
                        <TimePicker
                            format={format}
                            minuteStep={15}
                            onChange={handleOnChange}
                            style={{ fontFamily: "Roboto Slab" }}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <St.SlotTable
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                }}
            />
        </St.DivSlot>
    );
};

SlotTable.propTypes = {};

export default SlotTable;
