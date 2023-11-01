// import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as St from "./CourseTable.styled";
import ButtonAdd from "@/components/ButtonAdd";

const CourseTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const param = useParams();
    // console.log(param);

    useEffect(() => {
        // call api here
        fetchCourse();
    }, []);

    const fetchCourse = () => {
        setLoading(true);
        instance
            .get(`examRooms/getCourseAndNumOfStuOneSlot?exSlotID=${param.id}`)
            .then((res) => {
                // console.log(res);
                const formattedData = res.data.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                    key: index + 1,
                }));
                // console.log(formattedData);
                setData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Course",
            width: "20%",
            render: (record) => {
                return <Typography>{record.subCode}</Typography>;
            },
        },
        {
            title: "Number of Students",
            width: "20%",
            render: (record) => {
                return <Typography>{record.numOfStu}</Typography>;
            },
        },
    ];
    return (
        <St.DivStyled>
            <ButtonAdd
                setModalVisible={setModalVisible}
                title="Add new course"
            />
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: data.length <= 5,
                }}
            />
        </St.DivStyled>
    );
};

CourseTable.propTypes = {};

export default CourseTable;
