// import PropTypes from "prop-types";
import { Col, Divider, Row, Table } from "antd";

import columns from "./User.columns";
import data from "./User.data";

const User = () => {
    return (
        <Row>
            <Col xs={24}>
                <Divider orientation="left">User</Divider>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    // pagination={{ pageSize: 5, hideOnSinglePage: data.length <= 5 }}
                    pagination={false}
                />
            </Col>
        </Row>
    );
};

User.propTypes = {};

export default User;
