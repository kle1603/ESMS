// import PropTypes from 'prop-types'

import SemesterTable from "@/components/AdminTable/SemesterTable";
import { Divider } from "antd";

const AdminSemesters = () => {
    return (
        <div>
            <Divider orientation="left">Semester</Divider>
            <SemesterTable />
        </div>
    );
};

AdminSemesters.propTypes = {};

export default AdminSemesters;
