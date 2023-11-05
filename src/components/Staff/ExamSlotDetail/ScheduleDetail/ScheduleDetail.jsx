import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ScheduleDetail = ({ noti }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const pageSize = 10;

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
            width: "18%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Num of Students",
            width: "18%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomNum}</Typography>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                if (record.examiner === "N/A") {
                    return <Tag color="volcano">EMPTY</Tag>;
                } else {
                    return <Typography>{record.examiner}</Typography>;
                }
            },
        },
        {
            title: "Operation",
            width: "19%",
            render: (record) => {
                return (
                    <Typography.Link onClick={() => handleEdit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const handleEdit = (e) => {
        console.log(e);
    };

    useEffect(() => {
        // call api here
        fetchScheduleDetail();
    }, [noti]);

    const fetchScheduleDetail = () => {
        setLoading(true);
        instance
            .get(`examRooms/getExamRoomDetailByPhase?examSlotId=${param.id}`)
            .then((res) => {
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
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </div>
    );
};

ScheduleDetail.propTypes = {
    noti: PropTypes.bool,
};

export default ScheduleDetail;
