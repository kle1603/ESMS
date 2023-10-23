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

const StaffExamPhase = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

StaffExamPhase.propTypes = {};

export default StaffExamPhase;
