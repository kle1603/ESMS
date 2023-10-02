// import PropTypes from "prop-types";

import SlotTable from "@/components/AdminTable/SlotTable";
import { Col, Divider, Row } from "antd";

const AdminSlots = () => {
    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24}>
                <Divider orientation="left">Slot</Divider>
                <SlotTable />
            </Col>
        </Row>
    );
};

AdminSlots.propTypes = {};

export default AdminSlots;
