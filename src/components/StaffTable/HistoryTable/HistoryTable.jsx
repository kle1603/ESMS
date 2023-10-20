// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Popconfirm, Typography } from "antd";
import * as St from "./HistoryTable.styled";
import instance from "@/utils/instance";

const HistoryTable = () => {
    const [data, setData] = useState([
        {
            key: "1",
            no: "1",
            session: "FALL 2023",
            phase: "Dot 1",
            startDay: "01/01/2023",
            endDay: "03/01/2023",
        },
        {
            key: "2",
            no: "2",
            session: "FALL 2023",
            phase: "Dot 2",
            startDay: "01/01/2023",
            endDay: "03/01/2023",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        instance
            .get("examPhases")
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    session: item.sesson,
                    startDay: item.SDay,
                    endDay: item.EDay,
                    key: index,
                }));
                setLoading(false);
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e) => {
        console.log(e);
        // instance
        //     .delete("examPhases", { data: { id: e } })
        //     .then(() => {
        //         fetchData();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
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
            title: "Phase",
            dataIndex: "phase",
            width: "15%",
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
            render: (_, record) =>
                data.length >= 1 ? (
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
                dataSource={data}
                columns={columns}
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: data.length <= 5,
                }}
                loading={loading}
            />
        </div>
    );
};

export default HistoryTable;
