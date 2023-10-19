import configs from "@/configs";
import { HomeOutlined } from "@ant-design/icons";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";

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
                icon: <FiEdit />,
            },
            {
                label: "Change",
                key: configs.routes.lecturerCancelRegister,
                icon: <LiaExchangeAltSolid />,
            },
            {
                label: "View",
                key: configs.routes.lecturerSchedule,
                icon: <CiViewTable />,
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
