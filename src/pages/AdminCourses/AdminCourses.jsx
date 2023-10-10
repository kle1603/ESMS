// import PropTypes from "prop-types";

import CourseTable from "@/components/AdminTable/CourseTable";
import { Divider } from "antd";

const AdminCourses = () => {
    return (
        <div>
            <Divider orientation="left">Course</Divider>
            <CourseTable />
        </div>
    );
};

AdminCourses.propTypes = {};

export default AdminCourses;
