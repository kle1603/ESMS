import {
    DatePicker,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Tag,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

import * as St from "./PhaseTable.styled";
import instance from "@/utils/instance";
import toast from "react-hot-toast";
import ButtonAdd from "@/components/ButtonAdd";

const { RangePicker } = DatePicker;

const PhaseTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: 1,
            no: 1,
            name: "Dot 1 mua ha",
            startTime: "1/10/2023",
            endTime: "2/10/2023",
            status: "Close",
        },
        {
            key: 2,
            no: 2,
            name: "Dot bo sung lan 1",
            startTime: "3/10/2023",
            endTime: "10/10/2023",
            status: "Active",
        },
        {
            key: 3,
            no: 3,
            name: "Dot bo sung lan 2",
            startTime: "11/10/2023",
            endTime: "16/10/2023",
            status: "Active",
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.id}</Typography>;
            },
        },
        {
            title: "Name",
            width: "25%",
            render: (record) => {
                return <Typography>{record.ePName}</Typography>;
            },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.sDay}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.eDay}</Typography>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (text, record) => {
                const currentDate = new Date();
                const endTime = new Date(record);

                if (currentDate > endTime) {
                    return <Tag color="red">CLOSED</Tag>;
                } else {
                    return <Tag color="green">ON GOING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "20%",
            render: (_, record) => {
                const currentDate = new Date();
                const endTime = new Date(record);

                if (currentDate > endTime) {
                    return (
                        <Typography.Link disabled>
                            Can not delete
                        </Typography.Link>
                    );
                } else {
                    return (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link>Delete</Typography.Link>
                        </Popconfirm>
                    );
                }
            },
        },
    ];

    const options = [
        {
            value: "Fall 2023",
            label: "Fall 2023",
        },
        {
            value: "Summer 2023",
            label: "Summer 2023",
        },
        {
            value: "Spring 2023",
            label: "Spring 2023",
        },
        {
            value: "Fall 2022",
            label: "Fall 2022",
        },
        {
            value: "Summer 2022",
            label: "Summer 2022",
        },
    ];

    const option = [
        { value: "Coursera", label: "Coursera" },
        { value: "Normal", label: "Normal" },
    ];

    const fetchData = () => {
        // setLoading(true);
        instance
            .get("examPhases")
            .then((res) => {
                console.log(res);
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e) => {
        setLoading(true);
        instance
            .delete("examPhases", { data: { id: e } })
            .then(() => {
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                toast.error("Error deleted!");
                console.log(error);
            });
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                // const { startTime, endTime } = values;
                // instance
                //     .post("timeSlots", { startTime, endTime })
                //     .then(() => {
                //         toast.success("Successfully created!");
                //         form.resetFields();
                //         setModalVisible(false);
                //         fetchData();
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //         toast.error("Error created!");
                //     });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    // const initialValues = {
    //     // name: "Phase 1",
    //     // date: dayjs(),
    // };

    // const layout = {
    //     labelCol: {
    //         // offset: 0,
    //         // span: 7,
    //     },
    //     wrapperCol: {
    //         span: 12,
    //         offset: 3,
    //     },
    // };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    className="select"
                    defaultValue={options[0].value}
                    options={options}
                />
            </St.StyledLeft>

            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new phase"
            />

            <Modal
                title="Add new phase"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    form={form}
                    name="add_row_form"
                    // initialValues={initialValues}
                >
                    <div>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Name!",
                                },
                            ]}
                        >
                            <St.FlexStyled>
                                <Typography className="form__title">
                                    Name
                                </Typography>
                                <Input
                                    allowClear
                                    placeholder="Name"
                                    className="form__input"
                                    // style={{ fontFamily: "Signika !important"}}
                                />
                            </St.FlexStyled>
                        </Form.Item>

                        <Form.Item
                            name="option"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the option!",
                                },
                            ]}
                        >
                            <St.FlexStyled>
                                <Typography className="form__title">
                                    Option
                                </Typography>
                                <Select
                                    className="form__input"
                                    options={option}
                                    defaultValue={option[1].value}
                                />
                            </St.FlexStyled>
                        </Form.Item>
                        <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the Range Time!",
                                },
                            ]}
                        >
                            <St.FlexStyled>
                                <Typography className="form__title">
                                    Range
                                </Typography>
                                <RangePicker className="form__input" />
                            </St.FlexStyled>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <St.StyledTable
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

export default PhaseTable;
