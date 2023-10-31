// import PropTypes from 'prop-types'

import SemesterTable from "@/components/Admin/SemesterTable";
import { Divider } from "antd";
const AdminSemesters = () => {
    return (
        <div>
            <Divider orientation="left" style={{ fontFamily: "Inter", fontSize:"1.8rem" }}>
                Semester
            </Divider>
            <SemesterTable />
        </div>
    );
};

AdminSemesters.propTypes = {};

export default AdminSemesters;
