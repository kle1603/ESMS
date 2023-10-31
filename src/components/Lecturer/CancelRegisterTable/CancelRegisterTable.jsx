// import PropTypes from "prop-types";

import { Cascader, Popconfirm, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./CancelRegisterTable.styled";
import { useNavigate } from "react-router-dom";
import instance from "@/utils/instance";

const CancelRegisterTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        instance
            .get(`examiners/examPhaseId?userId=256&examPhaseId=1&semId=9`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchSemester = () => {
        instance
            .get("semesters")
            .then((res) => {
                const semestersData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item) => ({
                        label: item.season + " " + item.year,
                        value: item.id,
                    }));
                setSemesterId(semestersData[0].value);
                setSelectSemester(semestersData[0].label);
                setSemesters(semestersData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    const handleRegister = () => {
        navigate("/lecturer/register");
    };

    const handleDelete = () => {};

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
            title: "Operation",
            dataIndex: "operation",
            width: "25%",
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to register?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                ) : null,
        },
    ];

    const option = [
        {
            value: "Dot 1",
            label: "Dot 1",
        },
        {
            value: "Dot 2",
            label: "Dot 2",
        },
        {
            value: "Dot 3",
            label: "Dot 3",
        },
        {
            value: "Dot 4",
            label: "Dot 4",
        },
        {
            value: "Dot 5",
            label: "Dot 5",
        },
        {
            value: "Dot 6",
            label: "Dot 6",
        },
    ];

    const handleSelect = (id, option) => {
        setLoading(true);
        setSelectSemester(option.label);
        setSemesterId(id);
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
                <Typography className="title">Phase: </Typography>
                <Select
                    onChange={handleSelect}
                    value="Dot 1"
                    className="select"
                    options={option}
                />
            </St.StyledLeft>
            <St.ButtonTable
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={handleRegister}
            >
                Register
            </St.ButtonTable>

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
        </St.DivTable>
    );
};

CancelRegisterTable.propTypes = {};

export default CancelRegisterTable;
