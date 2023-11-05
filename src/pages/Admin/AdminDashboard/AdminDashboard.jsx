// import PropTypes from "prop-types";
import DashboardTable from "@/components/Admin/DashboardTable/DashboardTable";
import useScrollTopContent from "@/hooks/useScrollTopContent";

const Dashboard = () => {
    useScrollTopContent();

    return (
        <div>
            <DashboardTable />
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
