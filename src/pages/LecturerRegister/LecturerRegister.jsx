// import PropTypes from "prop-types";

import ExamTable from "@/components/LecturerTable/ExamTable";
import * as St from "./LecturerRegister.styled";
import instance from "@/utils/instance";

const items = [
    {
        key: "1",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>27/08/2023</span>
                <span>(Sun)</span>
            </div>
        ),
        children: <ExamTable />,
    },
    {
        key: "2",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>28/08/2023</span>
                <span>(Mon)</span>
            </div>
        ),
        children: <ExamTable />,
    },
    {
        key: "3",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>29/08/2023</span>
                <span>(Tue)</span>
            </div>
        ),
        children: <ExamTable />,
    },
    {
        key: "4",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>30/08/2023</span>
                <span>(Wed)</span>
            </div>
        ),
        children: <ExamTable />,
    },
    {
        key: "5",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>01/09/2023</span>
                <span>(Thu)</span>
            </div>
        ),
        children: <ExamTable />,
    },
    {
        key: "6",
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>02/09/2023</span>
                <span>(Fri)</span>
            </div>
        ),
        children: <ExamTable />,
    },
];

const LecturerExamPhase = () => {
    instance
        .get("examPhases/notScheduled")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <div>
            <St.StyledTabs
                // style={{ height: "500px" }}
                tabPosition="left"
                defaultActiveKey="1"
                items={items}
            />
        </div>
    );
};

LecturerExamPhase.propTypes = {};

export default LecturerExamPhase;
