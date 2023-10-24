// import PropTypes from "prop-types";

import SelectOption from "@/components/SelectOption";
import { Input, Select, Table, Typography } from "antd";

import * as St from "./ExamPhaseTable.styled";
import { useState } from "react";

const ExamPhaseTable = () => {
    const [editingKey, setEditingKey] = useState("");
    const [changes, setChanges] = useState({});

    const handleInputChange = (e, key, field) => {
        setChanges({
            ...changes,
            [key]: { ...changes[key], [field]: e.target.value.trim() },
        });
    };

    const handleSelectChange = (value, key, field) => {
        setChanges({
            ...changes,
            [key]: { ...changes[key], [field]: value },
        });
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        setEditingKey(record.key);
    };

    const save = async (key) => {
        console.log(changes[key]);
        console.log(key);
        setEditingKey("");
        setChanges({});
    };

    const cancel = () => {
        setEditingKey("");
    };

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
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 2,
            no: 2,
            day: "1/1/2023",
            startTime: "7:00",
            endTime: "8:30",
            room: "123",
            lecturer: "PhuongLNK",
        },
        {
            key: 3,
            no: 3,
            day: "2/1/2023",
            startTime: "7:00",
            endTime: "8:30",
            room: "120",
            lecturer: "HoangNT",
        },
        {
            key: 4,
            no: 4,
            day: "2/1/2023",
            startTime: "7:00",
            endTime: "8:30",
            room: "123",
            lecturer: "PhuongLNK",
        },
    ];

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
            width: "20%",
            render: (record) => {
                return <div>{record.day}</div>;
            },
            onCell: (record, rowIndex) => {
                let rowSpan = 1;
                if (rowIndex > 0 && data[rowIndex - 1].day === record.day) {
                    rowSpan = 0;
                } else {
                    let count = 0;
                    while (
                        rowIndex + count < data.length &&
                        data[rowIndex + count].day === record.day
                    ) {
                        count++;
                    }
                    rowSpan = count;
                }
                return {
                    rowSpan: rowSpan,
                };
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <div>{record.startTime}</div>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <div>{record.endTime}</div>;
            },
        },
        {
            title: "Room",
            width: "10%",
            render: (record) => {
                return isEditing(record) ? (
                    <Input
                        defaultValue={record.room}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "room")
                        }
                    />
                ) : (
                    <div>{record.room}</div>
                );
            },
        },
        {
            title: "Lecturer",
            width: "15%",
            render: (record) => {
                return isEditing(record) ? (
                    // <Input
                    //     defaultValue={record.lecturer}
                    //     onChange={(e) => handleInputChange(e, record.key, "lecturer")}
                    // />
                    <Select
                        style={{ width: "100%" }}
                        defaultValue={"Room"}
                        options={phase}
                        onChange={(value) =>
                            handleSelectChange(value, record.key, "lecturer")
                        }
                    />
                ) : (
                    <div>{record.lecturer}</div>
                );
            },
        },
        {
            title: "Operation",
            width: "15%",
            // render: (record) => {
            //     return (
            //         <Typography.Link onClick={() => handleDelete(record)}>
            //             Delete
            //         </Typography.Link>
            //     );
            // },
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                        <a onClick={cancel}>Cancel</a>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    // const handleDelete = (e) => {
    //     console.log(e);
    // };

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
            </St.StyledLeft>
            <St.ButtonTable type="primary" style={{ marginBottom: 16 }}>
                Add a row
            </St.ButtonTable>
            <Table bordered columns={columns} dataSource={data} />
        </St.DivTable>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
