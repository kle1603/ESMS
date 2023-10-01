import configs from "@/configs";
import {
    HomeOutlined,
    EditOutlined,
    BookOutlined,
    UserOutlined,
} from "@ant-design/icons";

const items = [
    { label: "Dashboard", key: configs.routes.admin, icon: <HomeOutlined /> },
    {
        label: "Semester",
        key: configs.routes.adminSemesters,
        icon: <EditOutlined />,
    },
    { label: "Slot", key: configs.routes.adminSlots, icon: <EditOutlined /> },
    {
        label: "Subject",
        key: configs.routes.adminSubjects,
        icon: <BookOutlined />,
    },
    { label: "User", key: configs.routes.adminUsers, icon: <UserOutlined /> },
];

export default items;
