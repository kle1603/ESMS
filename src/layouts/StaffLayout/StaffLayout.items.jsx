import configs from "@/configs";
import { HomeOutlined, EditOutlined } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";

const items = [
    {
        label: "Dashboard",
        key: "title",
        icon: null,
        type: "group",
        children: [
            {
                label: "Dashboard",
                key: configs.routes.staff,
                icon: <HomeOutlined />,
            },
        ],
    },

    {
        type: "divider",
    },
    {
        label: "Exam Phase",
        key: "title2",
        icon: null,
        type: "group",
        children: [
            {
                label: "Examiner",
                key: configs.routes.staffExaminer,
                icon: <EditOutlined />,
            },
            {
                label: "Exam Phase",
                key: configs.routes.staffExamPhase,
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
                icon: <MdLogout />,
            },
        ],
    },
];
