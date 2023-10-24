// import PropTypes from "prop-types";

import ExaminerTable from "@/components/AdminTable/ExaminerTable";
import { Divider } from "antd";

const AdminExaminers = () => {
    return (
        <div>
            <Divider orientation="left">User</Divider>
            <ExaminerTable />
        </div>
    );
};

AdminExaminers.propTypes = {};

export default AdminExaminers;