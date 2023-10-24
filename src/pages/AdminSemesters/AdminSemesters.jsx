// import PropTypes from 'prop-types'

import SemesterTable from "@/components/AdminTable/SemesterTable";
import { Divider } from "antd";

const AdminSemesters = () => {
    return (
        <div>
            <Divider orientation="left" style={{ fontFamily: "Roboto Slab" }}>
                Semester
            </Divider>
            <SemesterTable />
        </div>
    );
};

AdminSemesters.propTypes = {};

export default AdminSemesters;
