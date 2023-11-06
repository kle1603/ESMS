// import PropTypes from "prop-types";

import BarChart from "@/components/Dashboard/BarChart";
import CardItem from "@/components/Dashboard/CardItem/CardItem";
import CardTable from "@/components/Dashboard/CardTable";
import LineChart from "@/components/Dashboard/LineChart";
import { ScheduleOutlined } from "@ant-design/icons";
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
                    <Divider orientation="left">Sumimana</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                title="Title 1"
                                value={20}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title="Title 2"
                                value={20}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title="Title 3"
                                value={20}
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
                    <Divider orientation="left">Hello</Divider>
                    <LineChart />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Hello</Divider>
                    <BarChart />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Hello</Divider>
                    <CardTable />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
