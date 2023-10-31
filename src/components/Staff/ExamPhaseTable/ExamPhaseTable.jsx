// import PropTypes from "prop-types";

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Table,
    Tag,
    Typography,
} from "antd";

import * as St from "./ExamPhaseTable.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";

const ExamPhaseTable = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const navigate = useNavigate();

    const fetchData = () => {
        console.log(semesterId);

        instance
            .get(`examPhases/${semesterId}`)
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    key: item.id,
                    no: index + 1,
                }));
                setData(formattedData);
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

    useEffect(() => {
        fetchData();
    }, [semesterId]);

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
            title: "Name",
            width: "15%",
            render: (record) => {
                return <Typography>{record.ePName}</Typography>;
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.startDay}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.endDay}</Typography>;
            },
        },
        {
            title: "Type",
            width: "15%",
            render: (record) => {
                if (record.des === 0) {
                    return <Tag color="red">NORMAL</Tag>;
                } else {
                    return <Tag color="green">COURSERA</Tag>;
                }
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                const currentDate = new Date();
                const endTime = new Date(record);

                if (currentDate > endTime) {
                    return <Tag color="red">FINISHED</Tag>;
                } else {
                    return <Tag color="green">PENDING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        style={{ background: "#5194f2" }}
                        onClick={() => handleEdit(record)}
                    >
                        Detail
                    </Button>
                );
            },
        },
    ];

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleOk = () => {};

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleEdit = (e) => {
        navigate(configs.routes.staff + `/examPhase/${e.no}`);
        console.log(e);
    };

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
            </St.StyledLeft>
            <St.ButtonTable
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={handleAdd}
            >
                Add a row
            </St.ButtonTable>
            <Modal
                title="Add a row"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please choose role!",
                            },
                            {
                                pattern:
                                    /^(Admin|admin|ADMIN|Staff|staff|Lecturer|lecturer)$/,
                                message: "Invalid role!",
                            },
                        ]}
                    >
                        <Input placeholder="Role" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                }}
            />
        </St.DivTable>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
