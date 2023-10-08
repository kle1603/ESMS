// import PropTypes from "prop-types";
import { useState } from "react";
import { Popconfirm, Table, Typography } from "antd";
import axios from "axios";
import * as St from "./HistoryTable.styled";

const HistoryTable = () => {
    const [dataSource, setDataSource] = useState([
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
    ]);

    const handleDelete = (key) => {
        axios
            .delete(`your-api-url/${key}`)
            .then(() => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
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
            title: "operation",
            dataIndex: "operation",
            width: "15%",
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div>
            <St.StyledTable
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: dataSource.length <= 5,
                }}
            />
        </div>
    );
};

export default HistoryTable;
