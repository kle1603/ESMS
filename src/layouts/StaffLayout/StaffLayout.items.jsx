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
                key: configs.routes.staff,
                icon: <HomeOutlined />,
            },
        ],
    },

    {
        type: "divider",
    },
    {
        label: "Data",
        key: "title2",
        icon: null,
        type: "group",
        children: [
            {
                label: "Test",
                key: configs.routes.staffTestNaNe,
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
