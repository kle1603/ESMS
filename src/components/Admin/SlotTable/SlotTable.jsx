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

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
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
            render: (record) =>
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

    const fetchData = () => {
        setLoading(true);
        instance
            .get(`timeSlots/semId?semId=${semesterId}`)
            .then((res) => {
                if (semesterId !== 0) {
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: item.id,
                        no: index + 1,
                        startTime: item.startTime.slice(0, 5),
                        endTime: item.endTime.slice(0, 5),
                    }));
                    setData(formattedData);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
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
            .finally(() => {});
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

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

    const handleSelect = (id, option) => {
        if (id !== semesterId) {
            setData([]);
            setLoading(true);
        }
        setSelectSemester(option.label);
        setSemesterId(id);
    };

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
                style={{ fontFamily: "Inter" }}
                form={form}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Slot Name
                            </Typography>
                            <Input
                                allowClear
                                placeholder="Input your slot name"
                                className="form__input"
                            />
                        </St.FlexStyled>
                    </Form.Item>

                    <Form.Item
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: "Please choose start time!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                Start Time
                            </Typography>
                            <TimePicker
                                format={format}
                                minuteStep={15}
                                onChange={handleOnChange}
                                className="form__input"
                            />
                        </St.FlexStyled>
                    </Form.Item>

                    <Form.Item
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please choose end time!",
                            },
                        ]}
                    >
                        <St.FlexStyled>
                            <Typography className="form__title">
                                End Time
                            </Typography>
                            <TimePicker
                                format={format}
                                minuteStep={15}
                                onChange={handleOnChange}
                                className="form__input"
                            />
                        </St.FlexStyled>
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
