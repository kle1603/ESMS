// import PropTypes from "prop-types";

import { Button, Divider, Form, Input, Modal, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useLocation, useParams } from "react-router-dom";
import * as St from "./StaffExamSlotDetail.styled";
import CourseTable from "@/components/Staff/ExamSlotDetail/CourseTable";
import ExamRoomTable from "@/components/Staff/ExamSlotDetail/ExamRoomTable";
import ExaminerTable from "@/components/Staff/ExamSlotDetail/ExaminerTable";
import ScheduleDetail from "@/components/Staff/ExamSlotDetail/ScheduleDetail";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";

const StaffExamPhaseDetail = () => {
    const { state } = useLocation();
    const param = useParams();
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectCourses, setSelectCourses] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const [buttonStatus, setButtonStatus] = useState(true);
    const [buttonOk, setButtonOk] = useState(false);
    const [phaseId, setPhaseId] = useState(0);
    // console.log(state);

    const items = [
        {
            key: "1",
            label: "Course",
            children: <CourseTable />,
        },
        {
            key: "2",
            label: "Room",
            children: <ExamRoomTable />,
        },
        {
            key: "3",
            label: "Examiner",
            children: <ExaminerTable />,
        },
        {
            key: "4",
            label: "Schedule Detail",
            children: <ScheduleDetail />,
        },
    ];

    useEffect(() => {
        setPhaseId(state.phaseId);
    }, []);

    useEffect(() => {
        fetchCourse();
    }, [phaseId]);

    const fetchCourse = () => {
        instance
            .get(`studentExams?ePId=${phaseId}`)
            .then((res) => {
                // console.log(res);
                if (phaseId !== 0) {
                    const formattedData = res.data.data.map((item) => ({
                        value: item.courId,
                        label: item.subCode + " - " + item.numOfStu,
                    }));
                    setSelectCourses(formattedData[0].label);
                    setDefaultValue(formattedData[0].value);
                    setCourses(formattedData);
                    setButtonStatus(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleOk = () => {
        setButtonOk(true);
        form.validateFields()
            .then((values) => {
                console.log(values);
                if (values.course === selectCourses) {
                    values.course = defaultValue;
                }
                console.log(param.id, values.course, values.numOfStu);
                instance
                    .post(`subInSlots`, {
                        courId: values.course,
                        examSlotId: param.id,
                        numStu: values.numOfStu,
                    })
                    .then((res) => {
                        console.log(res);
                        setButtonOk(false);
                        fetchCourse();
                        setModalVisible(false);
                        form.resetFields();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {});
            })
            .catch((error) => {
                console.log("Validate Failed:", error);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const operations = (
        <Button loading={buttonStatus} onClick={handleAdd}>
            Add new course
        </Button>
    );

    const modalFooter = () => {
        return (
            <>
                <Button loading={buttonOk} onClick={handleOk} type="primary">
                    Submit
                </Button>

                <Button onClick={handleCancel}>Cancel</Button>
            </>
        );
    };

    return (
        <>
            <Divider orientation="left">
                <Button onClick={handleBack} style={{ marginRight: 10 }}>
                    <ArrowLeftOutlined />
                </Button>
                {state.item}
            </Divider>
            <Modal
                title="Add new course"
                open={modalVisible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={modalFooter()}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="course"
                        rules={[
                            {
                                required: true,
                                message: "Please choose the course!",
                            },
                        ]}
                        initialValue={selectCourses}
                    >
                        <Select
                            // onChange={handleSelect}
                            // value={selectTimeSlot}
                            className="select"
                            options={courses}
                        />
                    </Form.Item>
                    <Form.Item
                        name="numOfStu"
                        rules={[
                            {
                                required: true,
                                message: "Please input number of students!",
                            },
                        ]}
                    >
                        <Input placeholder="Number of Students" />
                    </Form.Item>
                </Form>
            </Modal>
            <St.TabsStyled
                tabBarExtraContent={operations}
                defaultActiveKey="1"
                items={items}
            />
        </>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
