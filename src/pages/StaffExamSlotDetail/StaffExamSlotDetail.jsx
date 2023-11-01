// import PropTypes from "prop-types";

import { Button, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useLocation } from "react-router-dom";
import * as St from "./StaffExamSlotDetail.styled";
import CourseTable from "@/components/Staff/ExamSlotDetail/CourseTable";
import ExamRoomTable from "@/components/Staff/ExamSlotDetail/ExamRoomTable";
import ExaminerTable from "@/components/Staff/ExamSlotDetail/ExaminerTable";
import ScheduleDetail from "@/components/Staff/ExamSlotDetail/ScheduleDetail";

const StaffExamPhaseDetail = () => {
    const location = useLocation();
    // console.log(location.state.item);
    // console.log(param);

    const items = [
        {
            key: "1",
            label: "Course",
            children: <CourseTable />,
        },
        {
            key: "2",
            label: "Room",
            children: <ExamRoomTable />,
        },
        {
            key: "3",
            label: "Examiner",
            children: <ExaminerTable />,
        },
        {
            key: "4",
            label: "Schedule Detail",
            children: <ScheduleDetail />,
        },
    ];

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Divider orientation="left">
                <Button onClick={handleBack} style={{ marginRight: 10 }}>
                    <ArrowLeftOutlined />
                </Button>
                {location.state.item}
            </Divider>
            <St.TabsStyled defaultActiveKey="1" items={items} />
        </>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
