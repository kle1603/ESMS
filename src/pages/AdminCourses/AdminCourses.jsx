// import PropTypes from "prop-types";

import CourseTable from "@/components/Admin/CourseTable";
import { Divider } from "antd";

const AdminCourses = () => {
    return (
        <div>
            <Divider orientation="left" style={{ fontFamily: "Roboto Slab" }}>
                Course
            </Divider>
            <CourseTable />
        </div>
    );
};

AdminCourses.propTypes = {};

export default AdminCourses;
