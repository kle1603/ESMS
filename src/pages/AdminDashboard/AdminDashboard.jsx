// import PropTypes from "prop-types";

import { Col, Divider, Row } from "antd";

const Dashboard = () => {
    return (
        <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
            <Divider orientation="left">Dashboard</Divider>
        </Col>
    </Row>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
