import { Tag } from "antd";

const columns = [
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Role",
        key: "role",
        dataIndex: "role",
        render: (role) => {
            let color = role.length > 5 ? "geekblue" : "green";
            if (role === "loser") {
                color = "volcano";
            }
            return (
                <Tag color={color} key={role}>
                    {role.toUpperCase()}
                </Tag>
            );
        },
    },
];

export default columns;
