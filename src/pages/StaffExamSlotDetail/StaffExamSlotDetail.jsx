import ExamSlotTable from "@/components/Staff/ExamSlotTable";
import { Col, Row } from "antd";

const StaffExamSlotDetail = () => {
    return (
        <Row gutter={16}>
            <Col span={24}>
                <ExamSlotTable />
            </Col>
        </Row>
    );
};

StaffExamSlotDetail.propTypes = {};

export default StaffExamSlotDetail;
