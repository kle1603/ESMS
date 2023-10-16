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
        label: "Exam Schedule",
        key: "title3",
        icon: null,
        type: "group",
        children: [
            {
                label: "Register",
                key: configs.routes.lecturerRegister,
                icon: <EditOutlined />,
            },
            {
                label: "Change",
                key: configs.routes.lecturerCancelRegister,
                icon: <EditOutlined />,
            },
            {
                label: "View",
                key: configs.routes.lecturerSchedule,
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
