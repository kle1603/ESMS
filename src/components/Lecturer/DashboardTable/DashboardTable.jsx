// import PropTypes from "prop-types";

import CardItem from "@/components/Dashboard/CardItem/CardItem";
import LineChart from "@/components/Dashboard/LineChart";
import { Col, Divider, Row } from "antd";
import {
    HistoryOutlined,
    ScheduleOutlined,
    PaperClipOutlined,
    ExclamationOutlined,
} from "@ant-design/icons";
import CardTable from "@/components/Dashboard/CardTable";
import BarChart from "@/components/Dashboard/BarChart";

const DashboardTable = () => {
    return (
        <div>
            <Row gutter={[16, 20]}>
                <Col xs={24} md={24} lg={11}>
                    <Divider orientation="left">Haha</Divider>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <CardItem
                                title={"Total Slots"}
                                value={20}
                                icon={<ScheduleOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title={"Remaining Slots"}
                                value={0}
                                icon={<PaperClipOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title={"Completed Slots"}
                                value={12}
                                icon={<HistoryOutlined className="icon" />}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <CardItem
                                title={"Violated Slots"}
                                value={0}
                                icon={<ExclamationOutlined className="icon" />}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={24} lg={13}>
                    <Divider orientation="left">Haha</Divider>
                    <LineChart />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Haha</Divider>
                    <BarChart />
                </Col>
                <Col xs={24}>
                    <Divider orientation="left">Haha</Divider>
                    <CardTable />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
