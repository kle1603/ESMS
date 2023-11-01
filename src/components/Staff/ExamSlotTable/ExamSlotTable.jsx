// import PropTypes from "prop-types";

import { Button, Divider, Form, Input, Modal, Select, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import * as St from "./ExamSlotTable.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";

const ExamPhaseTable = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectTimeSlot, setSelectTimeSlot] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const [semesterId, setSemesterId] = useState(state.data.semId);
    const [buttonStatus, setButtonStatus] = useState(true);

    useEffect(() => {
        fetchData();
        fetchTimeSlot();
    }, []);

    const fetchData = () => {
        instance
            .get(`examSlots/${id}`)
            .then((res) => {
                console.log(res.data.data);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                    startTime: item.timeSlot.startTime.slice(0, -3),
                    endTime: item.timeSlot.endTime.slice(0, -3),
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

    const fetchTimeSlot = () => {
        instance
            .get(`timeSlots/des?examphaseId=${id}&semesterId=${semesterId}`)
            .then((res) => {
                if (id !== 0) {
                    const formattedData = res.data.data.map((item) => ({
                        value: item.id,
                        label:
                            item.startTime.slice(0, -3) +
                            "-" +
                            item.endTime.slice(0, -3),
                    }));
                    setSelectTimeSlot(formattedData[0].label);
                    setDefaultValue(formattedData[0].value);
                    setTimeSlots(formattedData);
                    setButtonStatus(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Day",
            width: "30%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
        },
        {
            title: "Start Time",
            width: "20%",
            render: (record) => {
                return <div>{record.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "20%",
            render: (record) => {
                return <div>{record.endTime}</div>;
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        style={{ background: "#5194f2" }}
                        onClick={() => handleEdit(record)}
                    >
                        Detail
                    </Button>
                );
            },
        },
    ];

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                if (values.slot === selectTimeSlot) {
                    values.slot = defaultValue;
                }
                console.log(id, values.day, values.slot);
                instance
                    .post(`examSlots`, {
                        ePId: id,
                        timeSlotId: values.slot,
                        day: values.day,
                    })
                    .then((res) => {
                        console.log(res);
                        fetchData();
                        setModalVisible(false);
                        form.resetFields();
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                    });
            })
            .catch((error) => {
                console.log("Validate Failed:", error);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleEdit = (e) => {
        // navigate(configs.routes.staff + `/examSlot/${e.id}`);
        console.log(state.data);
        console.log(e);

        navigate(configs.routes.staff + `/examSlot/${e.id}`, {
            state: {
                item:
                    "Day: " +
                    e.day +
                    " Time: " +
                    e.timeSlot.startTime.slice(0, 5) +
                    "-" +
                    e.timeSlot.endTime.slice(0, 5),
            },
        });
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleSelect = (id, option) => {};

    return (
        <>
            <Divider orientation="left">
                <Button onClick={handleBack} style={{ marginRight: 10 }}>
                    <ArrowLeftOutlined />
                </Button>
                {state.data.ePName +
                    " - " +
                    state.data.startDay +
                    " - " +
                    state.data.endDay}
            </Divider>

            <St.DivTable>
                <St.ButtonTable
                    loading={buttonStatus}
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={handleAdd}
                >
                    Add a exam slot
                </St.ButtonTable>
                <Modal
                    title="Add a row"
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} name="add_row_form">
                        <Form.Item
                            name="day"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the day!",
                                },
                            ]}
                        >
                            <Input placeholder="Day" />
                        </Form.Item>
                        <Form.Item
                            name="slot"
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose the slot!",
                                },
                            ]}
                            initialValue={selectTimeSlot}
                        >
                            <Select
                                onChange={handleSelect}
                                // value={selectTimeSlot}
                                className="select"
                                options={timeSlots}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
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
        </>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
