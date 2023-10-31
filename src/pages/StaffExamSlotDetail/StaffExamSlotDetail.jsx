// import PropTypes from "prop-types";

import { Card, Divider, Table, Typography } from "antd";
import { useParams } from "react-router-dom";
import * as St from "./StaffExamSlotDetail.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";

const StaffExamPhaseDetail = () => {
    const [semester, setSemester] = useState([]);
    const param = useParams();
    console.log(param.id);

    useEffect(() => {
        // call api here
        fetchData();
        fetchSemester();
    }, []);

    const fetchData = () => {
        instance
            .get("examRooms/getCourseOneSlot?exSlotID=22")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchSemester = () => {
        instance
            .get("semesters")
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item, index) => ({
                        ...item,
                        no: index + 1,
                        key: item.id,
                        season: item.season + " " + item.year,
                    }));
                setSemester(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const data = [
        {
            key: 1,
            no: 1,
            course: "MAE",
            room: "610",
            examiner: "PhuongLHK real",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            key: 2,
            no: 2,
            course: "MAE",
            room: "611",
            examiner: "PhuongLHK clone 1",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            key: 3,
            no: 3,
            course: "MAE",
            room: "612",
            examiner: "PhuongLHK clone 2",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            key: 4,
            no: 4,
            course: "SWP",
            room: "614",
            examiner: "PhuongLHK clone 3",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            key: 5,
            no: 5,
            course: "SWP",
            room: "615",
            examiner: "PhuongLHK clone 4",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            key: 6,
            no: 6,
            course: "SWP",
            room: "616",
            examiner: "PhuongLHK clone 5",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
    ];

    const columns1 = [
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
                return <Typography>{record.course}</Typography>;
            },
        },
        {
            title: "Number of Students",
            width: "20%",
            render: (record) => {
                return <Typography>{record.nOS}</Typography>;
            },
        },
    ];

    const columns2 = [
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
                return <Typography>{record.room}</Typography>;
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

    const columns3 = [
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
                return <Typography>{record.examiner}</Typography>;
            },
        },
        {
            title: "Email",
            width: "20%",
            render: (record) => {
                return <Typography>{record.email}</Typography>;
            },
        },
    ];

    const columns4 = [
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
                return <Typography>{record.course}</Typography>;
            },
        },
        {
            title: "Room",
            width: "20%",
            render: (record) => {
                return <Typography>{record.room}</Typography>;
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
                <Card>
                    <Table bordered columns={columns1} dataSource={data} />
                </Card>
            ),
        },
        {
            key: "2",
            label: "Room",
            children: (
                <Card>
                    <Table bordered columns={columns2} dataSource={data} />
                </Card>
            ),
        },
        {
            key: "3",
            label: "Examiner",
            children: (
                <Card>
                    <Table bordered columns={columns3} dataSource={data} />
                </Card>
            ),
        },
        {
            key: "4",
            label: "Slot",
            children: (
                <Card>
                    <Table
                        columns={columns4}
                        dataSource={data}
                        bordered
                        pagination={{
                            pageSize: 5,
                            hideOnSinglePage: data.length <= 5,
                        }}
                    />
                </Card>
            ),
        },
    ];

    return (
        <Typography>
            <Divider orientation="left">
                Fall 2023 - Dot 1 - 1/1/2023 - Slot 1
            </Divider>
            <St.TabsStyled defaultActiveKey="1" items={items} />
        </Typography>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
