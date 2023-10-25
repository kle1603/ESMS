// import PropTypes from "prop-types";

import { Table } from "antd";

const ExaminerTable = () => {
    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Email",
            width: "20%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Name",
            width: "20%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Role",
            width: "15%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                return <div>{record.no}</div>;
            },
        },
        {
            title: "Operation",
            width: "20%",
        },
    ];

    return (
        <div>
            <Table columns={columns} />
        </div>
    );
};

ExaminerTable.propTypes = {};

export default ExaminerTable;
