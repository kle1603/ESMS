// import PropTypes from "prop-types";

import { Card, Col, DatePicker, Divider, Form, Input, Row, Table } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const StaffExamPhaseDetail = () => {
    const param = useParams();
    console.log(param.id);

    return (
        <div>
            <Divider orientation="left">Editable</Divider>
            <Row gutter={16}>
                <Col span={14}>
                    <Card>
                        <Form>
                            <Form.Item
                                label="Day"
                                name="day"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your day!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    defaultValue={dayjs(
                                        dayjs(),
                                        dateFormatList[0]
                                    )}
                                    format={dateFormatList}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input time!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Room"
                                name="room"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input room!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card>
                        <Table/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

StaffExamPhaseDetail.propTypes = {};

export default StaffExamPhaseDetail;
