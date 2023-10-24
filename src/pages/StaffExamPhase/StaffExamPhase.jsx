// import PropTypes from "prop-types";

import ExamPhaseTable from "@/components/Staff/ExamPhaseTable";
import { Col, Divider, Row } from "antd";

const StaffExamPhase = () => {
    return (
        <Row gutter={16}>
            <Col span={24}>
                <Divider orientation="left">Exam Phase</Divider>
                <ExamPhaseTable/>
            </Col>
        </Row>
    );
};

StaffExamPhase.propTypes = {};

export default StaffExamPhase;
