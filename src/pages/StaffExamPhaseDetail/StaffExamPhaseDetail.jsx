// import PropTypes from "prop-types";

import { Divider, Table, Tabs, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";

const StaffExamPhaseDetail = () => {
    const param = useParams();
    console.log(param.id);

    const data = [
        {
            no: 1,
            course: "MAE",
            room: "610",
            examiner: "PhuongLHK real",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            no: 2,
            course: "MAE",
            room: "611",
            examiner: "PhuongLHK clone 1",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            no: 3,
            course: "MAE",
            room: "612",
            examiner: "PhuongLHK clone 2",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            no: 4,
            course: "SWP",
            room: "614",
            examiner: "PhuongLHK clone 3",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
            no: 5,
            course: "SWP",
            room: "615",
            examiner: "PhuongLHK clone 4",
            nOS: 200,
            location: "XAVALO",
            email: "Hahaha@gmail.com",
        },
        {
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
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Course",
            width: "20%",
            render: (record) => {
                return <div>{record.course}</div>;
            },
        },
        {
            title: "Number of Students",
            width: "20%",
            render: (record) => {
                return <div>{record.nOS}</div>;
            },
        },
    ];

    const columns2 = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Room",
            width: "20%",
            render: (record) => {
                return <div>{record.room}</div>;
            },
        },
        {
            title: "Location",
            width: "20%",
            render: (record) => {
                return <div>{record.location}</div>;
            },
        },
    ];

    const columns3 = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Examiner",
            width: "20%",
            render: (record) => {
                return <div>{record.examiner}</div>;
            },
        },
        {
            title: "Email",
            width: "20%",
            render: (record) => {
                return <div>{record.email}</div>;
            },
        },
    ];

    const items = [
        {
            key: "1",
            label: "Course",
            children: <Table bordered columns={columns1} dataSource={data} />,
        },
        {
            key: "2",
            label: "Room",
            children: <Table bordered columns={columns2} dataSource={data} />,
        },
        {
            key: "3",
            label: "Examiner",
            children: <Table bordered columns={columns3} dataSource={data} />,
        },
    ];

    return (
        <div>
            <Divider orientation="left">
                Fall 2023 - Dot 1 - 1/1/2023 - Slot 1
            </Divider>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
