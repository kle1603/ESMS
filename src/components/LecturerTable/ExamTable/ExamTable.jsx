// import PropTypes from "prop-types";
import { useState } from "react";
import { Col, Popconfirm, Row, Typography } from "antd";
import axios from "axios";
import * as St from "./ExamTable.styled";

const ExamTable = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: "1",
            no: "1",
            startTime: "7:30",
            endTime: "9:00",
            slot: "3",
        },
        {
            key: "2",
            no: "2",
            startTime: "9:30",
            endTime: "11:00",
            slot: "3",
        },
        {
            key: "3",
            no: "3",
            startTime: "12:30",
            endTime: "14:00",
            slot: "2",
        },
        {
            key: "4",
            no: "4",
            startTime: "14:30",
            endTime: "15:00",
            slot: "5",
        },
    ]);

    const handleRegister = (key) => {
        axios
            .post(`your-api-url/${key}`)
            .then(() => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
            })
            .catch((error) => {
                console.error("Error item:", error);
            });
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            width: "10%",
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            width: "25%",
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            width: "25%",
        },
        {
            title: "Slot",
            dataIndex: "slot",
            width: "20%",
        },
        {
            title: "Operation",
            dataIndex: "operation",
            width: "20%",
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title="Sure to register?"
                        onConfirm={() => handleRegister(record.key)}
                    >
                        <Typography.Link>Register</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <Row>
            <Col span={24}>
                <St.StyledTable
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        pageSize: 5,
                        hideOnSinglePage: dataSource.length <= 5,
                    }}
                />
            </Col>
        </Row>
    );
};

export default ExamTable;
