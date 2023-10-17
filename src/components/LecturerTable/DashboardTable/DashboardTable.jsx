// import PropTypes from "prop-types";

import LineChart from "@/components/LineChart";
import { Col, Row } from "antd";

const DashboardTable = () => {
    return (
        <Row>
            <Col span={14}>
                <LineChart />
            </Col>
            <Col span={10}>HaHa</Col>
        </Row>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
