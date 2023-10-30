// import PropTypes from "prop-types";

import SelectOption from "@/components/SelectOption";
import { Button, Form, Input, Modal, Table, Typography } from "antd";

import * as St from "./ExamPhaseTable.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ExamPhaseTable = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const semester = [
        {
            value: "Fall 2023",
            label: "Fall 2023",
        },
        {
            value: "Summer 2023",
            label: "Summer 2023",
        },
    ];

    const phase = [
        {
            value: "Dot 1",
            label: "Dot 1",
        },
        {
            value: "Dot 2",
            label: "Dot 2",
        },
    ];

    const data = [
        {
            key: 1,
            no: 1,
            day: "1/1/2023",
            startTime: "7:00",
            endTime: "8:30",
            slot: "Slot 1",
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 2,
            no: 2,
            day: "1/1/2023",
            startTime: "9:00",
            endTime: "10:30",
            slot: "Slot 2",
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 3,
            no: 3,
            day: "1/1/2023",
            startTime: "11:00",
            endTime: "12:30",
            slot: "Slot 3",
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 4,
            no: 4,
            day: "1/1/2023",
            startTime: "13:00",
            endTime: "14:30",
            slot: "Slot 4",
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 5,
            no: 5,
            day: "2/1/2023",
            startTime: "7:00",
            endTime: "8:30",
            slot: "Slot 1",
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 6,
            no: 6,
            day: "2/1/2023",
            startTime: "9:00",
            endTime: "10:30",
            slot: "Slot 2",
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 7,
            no: 7,
            day: "2/1/2023",
            startTime: "11:00",
            endTime: "12:30",
            slot: "Slot 3",
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 8,
            no: 8,
            day: "2/1/2023",
            startTime: "13:00",
            endTime: "14:30",
            slot: "Slot 4",
            room: "123",
            lecturer: "PhuongLNK",
        },
    ];

    const columns = [
        // Your columns
        {
            title: "No",
            width: "5%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Day",
            width: "20%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
            // onCell: (record, rowIndex) => {
            //     let rowSpan = 1;
            //     if (rowIndex > 0 && data[rowIndex - 1].day === record.day) {
            //         rowSpan = 0;
            //     } else {
            //         let count = 0;
            //         while (
            //             rowIndex + count < data.length &&
            //             data[rowIndex + count].day === record.day
            //         ) {
            //             count++;
            //         }
            //         rowSpan = count;
            //     }
            //     return {
            //         rowSpan: rowSpan,
            //     };
            // },
        },
        {
            title: "Slot",
            width: "15%",
            render: (record) => {
                return <div>{record.slot}</div>;
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

    const handleOk = () => {};

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleEdit = (e) => {
        navigate(`${e.no}`);
        console.log(e);
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <SelectOption
                    defaultValue={semester[0].value}
                    options={semester}
                />
                <Typography className="title">Phase: </Typography>
                <SelectOption defaultValue={phase[0].value} options={phase} />
                <Typography className="title">
                    Range: 1/10/2023 - 8/10/2023
                </Typography>
            </St.StyledLeft>
            <St.ButtonTable
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={handleAdd}
            >
                Add a row
            </St.ButtonTable>
            <Modal
                title="Add a row"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please choose role!",
                            },
                            {
                                pattern:
                                    /^(Admin|admin|ADMIN|Staff|staff|Lecturer|lecturer)$/,
                                message: "Invalid role!",
                            },
                        ]}
                    >
                        <Input placeholder="Role" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
            <Table bordered columns={columns} dataSource={data} />
        </St.DivTable>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
