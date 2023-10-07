// import PropTypes from "prop-types";
import { Col, Divider, Row, Table } from "antd";

import columns from "./AdminUser.columns";
import instance from "@/utils/instance";
import { useEffect, useState } from "react";

const User = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        instance
            .get("users")
            .then((res) => {
                // console.log(res.data.data);
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                }));
                setLoading(false)
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Row>
            <Col xs={24}>
                <Divider orientation="left">User</Divider>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={loading}
                    pagination={{
                        // pageSize: 10,
                        hideOnSinglePage: data.length <= 5,
                    }}
                    // pagination={false}
                />
            </Col>
        </Row>
    );
};

User.propTypes = {};

export default User;
