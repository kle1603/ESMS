// import PropTypes from "prop-types";
import { Card, Divider, Table, Tag } from "antd";
import { useState } from "react";

const CardTable = () => {
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            day: "17/10/2023",
            startTime: "12:00",
            endTime: "14:00",
            status: "On going",
        },
        {
            key: 2,
            no: 2,
            day: "18/10/2023",
            startTime: "8:00",
            endTime: "10:00",
            status: "On going",
        },
        {
            key: 3,
            no: 3,
            day: "18/10/2023",
            startTime: "12:00",
            endTime: "14:00",
            status: "On going",
        },
        {
            key: 4,
            no: 4,
            day: "18/10/2023",
            startTime: "15:00",
            endTime: "17:00",
            status: "On going",
        },
    ]);

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
            title: "Status",
            dataIndex: "status",
            width: "25%",
            render: (status) => {
                let color = status.length > 5 ? "geekblue" : "volcano";
                if (status === "lecturer") {
                    color = "magenta";
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
    ];
    return (
        <div>
            <Card hoverable>
                <Divider orientation="left">Schedule</Divider>
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
            </Card>
        </div>
    );
};

CardTable.propTypes = {};

export default CardTable;
