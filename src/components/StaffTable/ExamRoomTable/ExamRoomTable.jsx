// import PropTypes from "prop-types";
import { Popconfirm, Form, Typography, Input, Divider } from "antd";
import { useState } from "react";
import * as St from "./ExamRoomTable.styled";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    children,
    inputType,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const data = [
    {
        key: "1",
        no: "1",
        start: "7:30",
        end: "9:00",
        day: "28/9/2023",
        subject: "FER",
        room: "301",
        location: "campus",
        lecturer: "HoangNT",
    },
    {
        key: "2",
        no: "2",
        start: "9:30",
        end: "11:00",
        day: "28/9/2023",
        subject: "PRN",
        room: "401",
        location: "campus",
        lecturer: "HungLD",
    },
];

const ExamRoomTable = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState(data);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setDataSource(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const cancel = () => {
        setEditingKey("");
    };

    const edit = (record) => {
        form.setFieldsValue({
            startDay: "",
            endDay: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
        },
        {
            title: "Start",
            dataIndex: "start",
            width: "10%",
        },
        {
            title: "End",
            dataIndex: "end",
            width: "10%",
        },
        {
            title: "Day",
            dataIndex: "day",
            width: "10%",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            width: "10%",
        },
        {
            title: "Room",
            dataIndex: "room",
            editable: true,
            width: "10%",
        },
        {
            title: "Location",
            dataIndex: "location",
            width: "10%",
        },
        {
            title: "Lecturer",
            dataIndex: "lecturer",
            editable: true,
            width: "15%",
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "15%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Typography.Link>Cancel</Typography.Link>
                        </Popconfirm>
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

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <Divider orientation="left">Exam Room</Divider>
            <Form form={form} component={false}>
                <St.StyledTable
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 7,
                        hideOnSinglePage: dataSource.length <= 7,
                    }}
                />
            </Form>
        </div>
    );
};

export default ExamRoomTable;
