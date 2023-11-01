// import PropTypes from "prop-types";

import { Divider, Table, Typography } from "antd";
import { useLocation, useParams } from "react-router-dom";
import * as St from "./StaffExamSlotDetail.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";

const StaffExamPhaseDetail = () => {
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [data_3, setData_3] = useState([]);
    const [data_4, setData_4] = useState([]);
    const param = useParams();
    const location = useLocation();
    // console.log(location.state.item);
    // console.log(param);

    useEffect(() => {
        // call api here
        fetchCourse();
        fetchRoom();
        fetchExaminer();
        fetchScheduleDetail();
    }, []);

    const fetchCourse = () => {
        instance
            .get(`examRooms/getCourseOneSlot?exSlotID=${param.id}}`)
            .then((res) => {
                // console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData_1(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchRoom = () => {
        instance
            .get(`examRooms/getRoomOneSlot?exSlotID=${param.id}`)
            .then((res) => {
                // console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData_2(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchExaminer = () => {
        instance
            .get(`examRooms/getExaminerOneSlot?exSlotID=${param.id}`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData_3(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchScheduleDetail = () => {
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
                setData_4(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const columns_1 = [
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
            title: "Number of Students",
            width: "20%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
    ];

    const columns_2 = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
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
            title: "Location",
            width: "20%",
            render: (record) => {
                return <Typography>{record.location}</Typography>;
            },
        },
    ];

    const columns_3 = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                return <Typography>{record.examinerName}</Typography>;
            },
        },
        {
            title: "Email",
            width: "20%",
            render: (record) => {
                return <Typography>{record.examinerEmail}</Typography>;
            },
        },
    ];

    const columns_4 = [
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

    const items = [
        {
            key: "1",
            label: "Course",
            children: (
                <Table
                    columns={columns_1}
                    dataSource={data_1}
                    bordered
                    pagination={{
                        pageSize: 5,
                        hideOnSinglePage: data_1.length <= 5,
                    }}
                />
            ),
        },
        {
            key: "2",
            label: "Room",
            children: (
                <Table
                    columns={columns_2}
                    dataSource={data_2}
                    bordered
                    pagination={{
                        pageSize: 5,
                        hideOnSinglePage: data_2.length <= 5,
                    }}
                />
            ),
        },
        {
            key: "3",
            label: "Examiner",
            children: (
                <Table
                    columns={columns_3}
                    dataSource={data_3}
                    bordered
                    pagination={{
                        pageSize: 5,
                        hideOnSinglePage: data_3.length <= 5,
                    }}
                />
            ),
        },
        {
            key: "4",
            label: "Schedule Detail",
            children: (
                <Table
                    columns={columns_4}
                    dataSource={data_4}
                    bordered
                    pagination={{
                        pageSize: 5,
                        hideOnSinglePage: data_4.length <= 5,
                    }}
                />
            ),
        },
    ];

    return (
        <Typography>
            <Divider orientation="left">{location.state.item}</Divider>
            <St.TabsStyled defaultActiveKey="4" items={items} />
        </Typography>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
