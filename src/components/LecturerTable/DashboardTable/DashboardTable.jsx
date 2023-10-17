// import PropTypes from "prop-types";

import CardItem from "@/components/CardItem/CardItem";
import LineChart from "@/components/LineChart";
import { Col, Row } from "antd";

const DashboardTable = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={11}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <CardItem />
                        </Col>
                        <Col span={12}>
                            <CardItem />
                        </Col>
                        <Col span={12}>
                            <CardItem />
                        </Col>
                        <Col span={12}>
                            <CardItem />
                        </Col>
                    </Row>
                </Col>
                <Col span={13}>
                    <LineChart />
                </Col>
            </Row>
        </div>
    );
};

DashboardTable.propTypes = {};

export default DashboardTable;
