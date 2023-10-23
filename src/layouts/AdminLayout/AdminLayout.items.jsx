import configs from "@/configs";
import {
    HomeOutlined,
    EditOutlined,
    BookOutlined,
    UserOutlined,
    ProfileOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

import { SiGoogleclassroom } from "react-icons/si";
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
                label: "Semesters",
                key: configs.routes.adminSemesters,
                icon: <CalendarOutlined />,
            },
            {
                label: "Phase",
                key: configs.routes.adminPhases,
                icon: <EditOutlined />,
            },
            {
                label: "Subjects",
                key: configs.routes.adminSubjects,
                icon: <BookOutlined />,
            },
            {
                label: "Courses",
                key: configs.routes.adminCourses,
                icon: <ProfileOutlined />,
            },
            {
                label: "Rooms",
                key: configs.routes.adminRooms,
                icon: <SiGoogleclassroom />,
            },
            {
                label: "Users",
                key: configs.routes.adminUsers,
                icon: <UserOutlined />,
            },
            {
                label: "Examiners",
                key: configs.routes.adminExaminers,
                icon: <UserOutlined />,
            },
        ],
    },
    {
        type: "divider",
    },
];

export default items;

const handleClick = () => {};

export const item = [
    {
        label: "Logout",
        key: "title3",
        icon: null,
        type: "group",
        children: [
            {
                label: <span onClick={handleClick}>Logout</span>,
                key: configs.routes.login,
                icon: <MdLogout />,
            },
        ],
    },
];
