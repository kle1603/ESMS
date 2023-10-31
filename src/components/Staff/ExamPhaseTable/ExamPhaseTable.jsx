// import PropTypes from "prop-types";

import SelectOption from "@/components/SelectOption";
import { Button, Form, Input, Modal, Table, Typography } from "antd";

import * as St from "./ExamPhaseTable.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import configs from "@/configs";

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

    const data = [
        {
            key: 1,
            no: 1,
            name: "Dot 1",
            startTime: "7:00",
            endTime: "8:30",
            status: true,
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 2,
            no: 2,
            name: "Dot 2",
            startTime: "9:00",
            endTime: "10:30",
            status: false,
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 3,
            no: 3,
            name: "Dot 3",
            startTime: "11:00",
            endTime: "12:30",
            status: false,
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 4,
            no: 4,
            name: "Dot 4",
            startTime: "13:00",
            endTime: "14:30",
            status: false,
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 5,
            no: 5,
            name: "Dot 5",
            startTime: "7:00",
            endTime: "8:30",
            status: false,
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 6,
            no: 6,
            name: "Dot 6",
            startTime: "9:00",
            endTime: "10:30",
            status: false,
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 7,
            no: 7,
            name: "Dot 7",
            startTime: "11:00",
            endTime: "12:30",
            status: false,
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 8,
            no: 8,
            name: "Dot 8",
            startTime: "13:00",
            endTime: "14:30",
            status: false,
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
            title: "Name",
            width: "20%",
            render: (record) => {
                return <div>{record.name}</div>;
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
            title: "Status",
            width: "15%",
            render: (record) => {
                if (record.status === true) {
                    return <div>On going</div>;
                } else {
                    return <div>Close</div>;
                }
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
        navigate(configs.routes.staff + `/examPhase/${e.no}`);
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
