// import PropTypes from "prop-types";
import PendingTable from "@/components/StaffTable/PendingTable";
import { Divider } from "antd";

const StaffPending = () => {
    return (
        <div>
            <Divider orientation="left">Pending</Divider>
            <PendingTable />
        </div>
    );
};

export default StaffPending;
