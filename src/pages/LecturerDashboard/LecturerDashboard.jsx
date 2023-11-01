// import PropTypes from "prop-types";

import { LecDashboard } from "@/components/Lecturer/DashboardTable";
import { Divider } from "antd";

const LecturerDashboard = () => {
    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                    marginBottom: "40px",
                }}
            >
                Dashboard
            </Divider>
            <LecDashboard />
        </div>
    );
};

LecturerDashboard.propTypes = {};

export default LecturerDashboard;
