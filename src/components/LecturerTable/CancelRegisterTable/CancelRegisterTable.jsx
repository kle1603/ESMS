// import PropTypes from "prop-types";

import { Cascader, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

import * as St from "./CancelRegisterTable.styled";
import { useNavigate } from "react-router-dom";

const CancelRegisterTable = () => {
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            day: "17/10/2023",
            startTime: "12:00",
            endTime: "14:00",
        },
        {
            key: 2,
            no: 2,
            day: "18/10/2023",
            startTime: "8:00",
            endTime: "10:00",
        },
        {
            key: 3,
            no: 3,
            day: "18/10/2023",
            startTime: "12:00",
            endTime: "14:00",
        },
        {
            key: 4,
            no: 4,
            day: "18/10/2023",
            startTime: "15:00",
            endTime: "17:00",
        },
        {
            key: 5,
            no: 5,
            day: "19/10/2023",
            startTime: "12:00",
            endTime: "14:00",
        },
        {
            key: 6,
            no: 6,
            day: "19/10/2023",
            startTime: "8:00",
            endTime: "10:00",
        },
    ]);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        navigate("/lecturer/register");
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: "10%",
        },
        {
            title: "Day",
            dataIndex: "day",
            key: "day",
            width: "25%",
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
            dataIndex: "startTime",
            key: "startTime",
            width: "20%",
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            width: "20%",
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "25%",
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to register?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    const options = [
        {
            value: "Summer 2023",
            label: "Summer 2023",
        },
        {
            value: "Spring 2023",
            label: "Spring 2023",
        },
        {
            value: "Fall 2023",
            label: "Fall 2023",
        },
    ];

    const option = [
        {
            value: "Dot 1",
            label: "Dot 1",
        },
        {
            value: "Dot 2",
            label: "Dot 2",
        },
        {
            value: "Dot 3",
            label: "Dot 3",
        },
        {
            value: "Dot 4",
            label: "Dot 4",
        },
        {
            value: "Dot 5",
            label: "Dot 5",
        },
        {
            value: "Dot 6",
            label: "Dot 6",
        },
    ];

    return (
        <St.DivTable>
            <St.SpaceStyled>
                SEMESTER: 
                <Cascader style={{ width: 130 }} options={options} />
                PHASE: 
                <Cascader style={{ width: 80 }} options={option} />
            </St.SpaceStyled>
            <St.ButtonTable
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={handleRegister}
            >
                Register
            </St.ButtonTable>

            <Table
                scroll={{ x: true }}
                columns={columns}
                dataSource={data}
                bordered
                loading={false}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                    showSizeChanger: false,
                }}
            />
        </St.DivTable>
    );
};

CancelRegisterTable.propTypes = {};

export default CancelRegisterTable;
