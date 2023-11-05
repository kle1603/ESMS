// import PropTypes from "prop-types";

import BarChart from "@/components/Dashboard/BarChart";
import CardItem from "@/components/Dashboard/CardItem/CardItem";
import CardTable from "@/components/Dashboard/CardTable";
import LineChart from "@/components/Dashboard/LineChart";
import { ScheduleOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Select, Typography } from "antd";
import * as St from "./DashboardTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";

const DashboardTable = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);

    const [totalExaminer, setTotalExaminer] = useState(0);
    const [loadingExaminer, setLoadingExaminer] = useState(true);

    const [totalCourse, setTotalCourse] = useState("");
    const [loadingCourse, setLoadingCourse] = useState(true);

    const [totalSlot, setTotalSlot] = useState(0);
    const [loadingSlot, setLoadingSlot] = useState(true);

    const [totalRegister, setTotalRegister] = useState([]);
    const [loadingRegister, setLoadingRegister] = useState(true);

    const [dataTop, setDataTop] = useState([]);
    const [loadingDataTop, setLoadingDataTop] = useState(true);

    const fetchSemester = () => {
        instance
            .get("semesters")
            .then((res) => {
                const semestersData = res.data.data.map((item) => ({
                    label: item.season + " " + item.year,
                    value: item.id,
                }));
                const newData = semestersData.reverse();
                setSemesterId(newData[0].value);
                setSelectSemester(newData[0].label);
                setSemesters(newData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchPhase = () => {
        instance
            .get(`examPhases/${semesterId}`)
            .then((res) => {
                if (semesterId !== 0) {
                    if (res.data.data.length !== 0) {
                        const phaseData = res.data.data.map((item) => ({
                            label: item.ePName,
                            value: item.id,
                        }));
                        const newData = phaseData.reverse();
                        setSelectPhase(newData[0].label);
                        setPhaseId(newData[0].value);
                        setPhases(newData);
                    } else {
                        setSelectPhase("");
                        setPhases([]);
                    }
                }
            })
            .catch((error) => {
                console.log("Phase: " + error);
            })
            .finally(() => {});
    };

    const fetchExaminer = () => {
        setLoadingExaminer(true);
        if (phaseId !== 0) {
            instance
                .get(`dashboard/examinerDashBoard?ePId=${phaseId}`)
                .then((res) => {
                    const data = res.data.data;
                    setTotalExaminer(data);

                    setLoadingExaminer(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setTotalExaminer(0);
            // setLoading(false);
        }
    };

    const fetchCourse = () => {
        setLoadingCourse(true);
        if (phaseId !== 0) {
            instance
                .get(`dashboard/numOfCourseNotScheduled?ePId=${phaseId}`)
                .then((res) => {
                    // console.log(res.data.data);
                    const data =
                        res.data.data.assigned + "/ " + res.data.data.total;
                    // console.log(data)                    ;
                    setTotalCourse(data);

                    setLoadingCourse(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setTotalCourse("");
            // setLoading(false);
        }
    };

    const fetchSlot = () => {
        setLoadingSlot(true);
        if (phaseId !== 0) {
            instance
                .get(`dashboard/totalSlotDashBoard?ePId=${phaseId}`)
                .then((res) => {
                    const data = res.data.data;
                    setTotalSlot(data);

                    setLoadingSlot(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setTotalSlot(0);
            // setLoading(false);
        }
    };

    const fetchTotalRegisterByDay = () => {
        setLoadingRegister(true);
        if (phaseId !== 0) {
            instance
                .get(`dashboard/numOfDayRegister?ePId=${phaseId}`)
                .then((res) => {
                    // console.log(res.data.data);
                    const data = res.data.data;
                    setTotalRegister(data);

                    setLoadingRegister(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setTotalRegister([]);
            // setLoading(false);
        }
    };

    const fetchTopExaminer = () => {
        setLoadingDataTop(true);
        if (phaseId !== 0) {
            instance
                .get(`dashboard/topThreeExaminerDashBoard?ePId=${phaseId}`)
                .then((res) => {
                    console.log(res.data.data);
                    const formatData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                    }));
                    setDataTop(formatData);
                    setLoadingDataTop(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setDataTop([]);
            // setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchData();
    // }, [page]);

    useEffect(() => {
        fetchExaminer();
        fetchCourse();
        fetchSlot();
        fetchTotalRegisterByDay();
        fetchTopExaminer();
    }, [phaseId]);

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    const handleSelectSemester = (id, option) => {
        setSelectSemester(option.label);
        setSemesterId(id);
        setPhaseId(0);
        setPhases([]);
    };

    const handleSelectPhase = (id, option) => {
        setSelectPhase(option.label);
        setPhaseId(id);
    };

    return (
        <div>
            <Row gutter={[16, 20]}>
                <Col xs={24} md={24} lg={24}>
                    <St.StyledLeft>
                        <Typography className="title">Semester: </Typography>
                        <Select
                            onChange={handleSelectSemester}
                            value={selectSemester}
                            className="select"
                            options={semesters}
                        />
                        {phases.length !== 0 ? (
                            <Flex>
                                <Typography className="title">
                                    Phase:
                                </Typography>
                                <Select
                                    onChange={handleSelectPhase}
                                    value={selectPhase}
                                    className="select"
                                    options={phases}
                                />
                            </Flex>
                        ) : (
                            <div></div>
                        )}
                    </St.StyledLeft>
                </Col>
                <Col xs={24} md={24} lg={11}>
                    <Divider orientation="left">Data</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"Examiners at this phase"}
                                loading={loadingExaminer}
                                title="Total"
                                value={totalExaminer}
                                icon={<UserOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"Courses at this phase"}
                                loading={loadingCourse}
                                title="Assigned/ Total"
                                value={totalCourse}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                desc={"ExamSlots at this phase"}
                                loading={loadingSlot}
                                title="Total"
                                value={totalSlot}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title="Title 4"
                                value={20}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={13}>
                    <Divider orientation="left">Register per day</Divider>
                    <LineChart loading={loadingRegister} data={totalRegister} />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Hello</Divider>
                    <BarChart />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Top examiner</Divider>
                    <CardTable data={dataTop} loading={loadingDataTop} />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
