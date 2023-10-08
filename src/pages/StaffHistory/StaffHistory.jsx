// import PropTypes from "prop-types";

import HistoryTable from "@/components/StaffTable/HistoryTable";
import PendingTable from "@/components/StaffTable/PendingTable";
import { Tabs } from "antd";

const items = [
    {
        key: "1",
        label: "Pending",
        children: <PendingTable />,
    },
    {
        key: "2",
        label: "History",
        children: <HistoryTable />,
    },
];

const StaffHistory = () => {
    return (
        <div>
            {/* <Divider orientation="left">History</Divider>
            <HistoryTable /> */}
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

StaffHistory.propTypes = {};

export default StaffHistory;
