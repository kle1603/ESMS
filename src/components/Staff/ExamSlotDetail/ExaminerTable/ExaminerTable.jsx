// import PropTypes from "prop-types";

import instance from "@/utils/instance";
import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Examiner = ({ noti }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const param = useParams();

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
            title: "Examiner",
            width: "20%",
            render: (record) => {
                return <Typography>{record.examinerName}</Typography>;
            },
        },
        {
            title: "Email",
            width: "20%",
            render: (record) => {
                return <Typography>{record.examinerEmail}</Typography>;
            },
        },
    ];

    useEffect(() => {
        // call api here
        fetchExaminer();
    }, [noti]);

    const fetchExaminer = () => {
        setLoading(true);
        instance
            .get(`examRooms/getExaminerOneSlot?exSlotID=${param.id}`)
            .then((res) => {
                console.log(res);
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

    return (
        <div>
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
        </div>
    );
};

Examiner.propTypes = {};

export default Examiner;
