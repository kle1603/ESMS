// import PropTypes from "prop-types";

import BarChart from "@/components/Dashboard/BarChart";
import CardItem from "@/components/Dashboard/CardItem/CardItem";
import CardTable from "@/components/Dashboard/CardTable";
import LineChart from "@/components/Dashboard/LineChart";
import { ScheduleOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";

const DashboardTable = () => {
    return (
        <div>
            <Row gutter={[16, 20]}>
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
