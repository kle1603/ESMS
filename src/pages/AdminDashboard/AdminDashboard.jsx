// import PropTypes from "prop-types";

import DashboardTable from "@/components/Admin/DashboardTable/DashboardTable";
import { Divider } from "antd";

const Dashboard = () => {
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

Dashboard.propTypes = {};

export default Dashboard;
