// import PropTypes from "prop-types";

import { Dropdown, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

import * as St from "./CancelRegisterTable.styled";
import Search from "antd/es/input/Search";

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
    ]);
    const [label, setLabel] = useState("Fall 2023");

    const handleClick = (e) => {
        const value = e.target.innerText;
        console.log(value);
        setLabel(value);
    };

    const items = [
        {
            key: "1",
            label: <Typography onClick={handleClick}>Fall 2022</Typography>,
        },
        {
            key: "2",
            label: <Typography onClick={handleClick}>Spring 2023</Typography>,
        },
        {
            key: "3",
            label: <Typography onClick={handleClick}>Summer 2023</Typography>,
        },
        {
            key: "4",
            label: <Typography onClick={handleClick}>Fall 2023</Typography>,
        },
    ];

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

    return (
        <St.DivTable>
            <St.SpaceStyled>
                <Search />
            </St.SpaceStyled>
            <St.TagStyled color="geekblue">
                <Typography className="label">{label}</Typography>
            </St.TagStyled>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottom"
            >
                <St.ButtonTable type="primary" style={{ marginBottom: 16 }}>
                    Semesters
                </St.ButtonTable>
            </Dropdown>
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
