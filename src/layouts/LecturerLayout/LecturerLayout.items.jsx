import configs from "@/configs";
import { HomeOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";

const items = [
    {
        label: "Dashboard",
        key: "title",
        icon: null,
        type: "group",
        children: [
            {
                label: "Dashboard",
                key: configs.routes.lecturer,
                icon: <HomeOutlined />,
            },
        ],
    },
    {
        type: "divider",
    },
    {
        label: "Exam Phase",
        key: "title3",
        icon: null,
        type: "group",
        children: [
            {
                label: "Exam Phase",
                key: configs.routes.lecturerExamPhase,
                icon: <EditOutlined />,
            },
        ],
    },
    {
        type: "divider",
    },
];

export default items;

export const item = [
    {
        label: "Logout",
        key: "title3",
        icon: null,
        type: "group",
        children: [
            {
                label: "Logout",
                key: "logout",
                icon: <LogoutOutlined />,
            },
        ],
    },
];
