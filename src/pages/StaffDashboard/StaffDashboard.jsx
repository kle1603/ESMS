// import PropTypes from "prop-types";

import DashboardTable from "@/components/Staff/DashboardTable";
import { Divider } from "antd";

const StaffDashboard = () => {
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
            <DashboardTable />
        </div>
    );
};

StaffDashboard.propTypes = {};

export default StaffDashboard;
