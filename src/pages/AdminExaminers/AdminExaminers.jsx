// import PropTypes from "prop-types";

import ExaminerTable from "@/components/Admin/ExaminerTable";
import { Divider } from "antd";

const AdminExaminers = () => {
    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                }}
            >
                Examiner
            </Divider>
            <ExaminerTable />
        </div>
    );
};

AdminExaminers.propTypes = {};

export default AdminExaminers;
