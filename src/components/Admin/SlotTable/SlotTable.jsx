// import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Tag, TimePicker, Typography } from "antd";
import * as St from "./SlotTable.styled";
import { useState } from "react";
// import moment from "moment";
// import moment from "moment";

const SlotTable = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setModalVisible(true);
    };
    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log(values.startTime.format("HH:mm"));
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

    const columns = [
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
            width: "20%",
            render: (record) => {
                return <Typography>{record.name}</Typography>;
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
            title: "Status",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record.endTime);

                if (currentDate > endTime) {
                    return <Tag color="red">CLOSED</Tag>;
                } else {
                    return <Tag color="green">ON-GOING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            // render: (record) => {
            //     const currentTime = new Date();
            //     const endTime = new Date(record.endTime);

            //     if (currentTime > endTime) {
            //         return (
            //             <Flex
            //                 style={{
            //                     width: "100%",
            //                     display: "flex",
            //                     alignItems: "center",
            //                     justifyContent: "space-between",
            //                 }}
            //             ></Flex>
            //         );
            //     }
            // },
        },
    ];

    const data = [
        {
            no: 1,
            name: "Slot 1",
            startTime: "7:30",
            endTime: "9:15",
        },
        {
            no: 2,
            name: "Slot 2",
            startTime: "9:30",
            endTime: "11:45",
        },
        {
            no: 3,
            name: "Slot 3",
            startTime: "12:30",
            endTime: "14:15",
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

    return (
        <St.DivSlot>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    className="select"
                    defaultValue={options[0].value}
                    options={options}
                    style={{ minWidth: "140px" }}
                />
            </St.StyledLeft>
            <St.ButtonRight
                onClick={handleAdd}
                style={{ fontFamily: "Roboto Slab" }}
                type="primary"
            >
                Add a row
            </St.ButtonRight>

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
            />
        </St.DivSlot>
    );
};

SlotTable.propTypes = {};

export default SlotTable;
