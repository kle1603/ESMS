import ExamSlotTable from "@/components/Staff/ExamSlotTable";
import { Col, Row } from "antd";

const StaffExamPhaseDetail = () => {
    return (
        <Row gutter={16}>
            <Col span={24}>
                <ExamSlotTable />
            </Col>
        </Row>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
