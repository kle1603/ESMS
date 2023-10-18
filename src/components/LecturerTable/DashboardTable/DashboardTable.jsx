// import PropTypes from "prop-types";

import CardItem from "@/components/CardItem/CardItem";
import LineChart from "@/components/LineChart";
import { Col, Row } from "antd";
import {
    HistoryOutlined,
    ScheduleOutlined,
    PaperClipOutlined,
    ExclamationOutlined,
} from "@ant-design/icons";

const DashboardTable = () => {
    return (
        <div>
            <Row gutter={[16, 20]}>
                <Col xs={24} md={24} lg={11}>
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
                    <LineChart />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
