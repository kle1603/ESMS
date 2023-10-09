// import PropTypes from "prop-types";
import { Popconfirm, Form, Typography, Input, Divider } from "antd";
import { useState } from "react";
import * as St from "./PendingTable.styled";

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
        session: "FALL",
        year: "2023",
        type: "FE",
        block: "10",
        startDay: "01/01/2023",
        endDay: "03/01/2023",
    },
    {
        key: "2",
        no: "2",
        session: "FALL",
        year: "2023",
        type: "PE",
        block: "10",
        startDay: "01/01/2023",
        endDay: "03/01/2023",
    },
];

const PendingTable = () => {
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
            title: "Session",
            dataIndex: "session",
            width: "15%",
        },
        {
            title: "Year",
            dataIndex: "year",
            width: "10%",
        },
        {
            title: "Type",
            dataIndex: "type",
            width: "10%",
        },
        {
            title: "Block",
            dataIndex: "block",
            width: "10%",
        },
        {
            title: "Start Day",
            dataIndex: "startDay",
            editable: true,
            width: "15%",
        },
        {
            title: "End Day",
            dataIndex: "endDay",
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
                        pageSize: 5,
                        hideOnSinglePage: dataSource.length <= 5,
                    }}
                />
            </Form>
        </div>
    );
};

export default PendingTable;
