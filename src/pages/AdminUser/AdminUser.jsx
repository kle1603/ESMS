// import PropTypes from "prop-types";

import UserTable from "@/components/Admin/UserTable";
import { Divider } from "antd";

const AdminUser = () => {
    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                }}
            >
                User
            </Divider>
            <UserTable />
        </div>
    );
};

AdminUser.propTypes = {};

export default AdminUser;
