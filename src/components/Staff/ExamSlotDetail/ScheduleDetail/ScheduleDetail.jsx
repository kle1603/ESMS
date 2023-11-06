import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Button, Input, Table, Tag, Typography, Form } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as St from "./ScheduleDetail.styled";

const ScheduleDetail = ({ noti }) => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();
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
            title: "Course",
            width: "18%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Num of Students",
            width: "18%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                if (record.examiner === "N/A") {
                    return <Tag color="volcano">EMPTY</Tag>;
                } else {
                    return <Typography>{record.examiner}</Typography>;
                }
            },
        },
        {
            title: "Operation",
            width: "19%",
            render: (record) => {
                return (
                    <Typography.Link onClick={() => handleEdit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    useEffect(() => {
        // call api here
        fetchScheduleDetail();
    }, [noti]);

    const fetchScheduleDetail = () => {
        setLoading(true);
        instance
            .get(`examRooms/getExamRoomDetailByPhase?examSlotId=${param.id}`)
            .then((res) => {
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {})
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const handleEdit = (e) => {
        form.setFieldsValue({
            courseCode: e.subCode,
            room: e.roomNum,
            examiner: e.examiner,
        });
        setModalVisible(true);
    };

    // console.log(courseCode, room, examiner);

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

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 24,
        },
    };

    return (
        <div>
            <St.ModalStyled
                title="Edit information"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter}
            >
                <Form
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="courseCodeForm"
                >
                    <Form.Item
                        {...layout}
                        label="Course Code"
                        name="courseCode"
                        rules={[
                            {
                                required: false,
                                message: "Please input the course code!",
                            },
                        ]}
                        // initialValue={courseCode}
                    >
                        <Input placeholder="Course Code" disabled />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Room"
                        name="room"
                        rules={[
                            {
                                required: false,
                                message: "Please input the room!",
                            },
                        ]}
                        // initialValue={room}
                    >
                        <Input placeholder="Room" disabled />
                    </Form.Item>

                    <Form.Item
                        {...layout}
                        label="Examiner"
                        name="examiner"
                        rules={[
                            {
                                required: true,
                                message: "Please input the examiner!",
                            },
                        ]}
                        // initialValue={examiner}
                    >
                        <Input placeholder="Examiner" allowClear />
                    </Form.Item>
                </Form>
            </St.ModalStyled>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </div>
    );
};

ScheduleDetail.propTypes = {
    noti: PropTypes.bool,
};

export default ScheduleDetail;
