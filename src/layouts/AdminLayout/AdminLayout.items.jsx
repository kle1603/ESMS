import configs from "@/configs";
import {
    HomeOutlined,
    EditOutlined,
    BookOutlined,
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

import { SiGoogleclassroom } from "react-icons/si"

const items = [
    {
        label: "Dashboard",
        key: "title",
        icon: null,
        type: "group",
        children: [
            {
                label: "Dashboard",
                key: configs.routes.admin,
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
                label: "Semester",
                key: configs.routes.adminSemesters,
                icon: <CalendarOutlined />,
            },
            {
                label: "Slot",
                key: configs.routes.adminSlots,
                icon: <EditOutlined />,
            },
            {
                label: "Subject",
                key: configs.routes.adminSubjects,
                icon: <BookOutlined />,
            },
            {
                label: "Course",
                key: configs.routes.adminCourses,
                icon: <ProfileOutlined />,
            },
            {
                label: "Room",
                key: configs.routes.adminRoom,
                icon: <SiGoogleclassroom />,
            },
            {
                label: "User",
                key: configs.routes.adminUsers,
                icon: <UserOutlined />,
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
