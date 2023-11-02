// import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ScheduleDetail = ({ noti }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Course",
            width: "20%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Room",
            width: "20%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                return <Typography>{record.examiner}</Typography>;
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: () => {
                return <Typography.Link>Edit</Typography.Link>;
            },
        },
    ];
    useEffect(() => {
        // call api here
        fetchScheduleDetail();
    }, [noti]);

    const fetchScheduleDetail = () => {
        setLoading(true);
        instance
            .get(`examRooms/getExamRoomDetailByPhase?examSlotId=${param.id}`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: data.length <= 5,
                }}
            />
        </div>
    );
};

ScheduleDetail.propTypes = {};

export default ScheduleDetail;
