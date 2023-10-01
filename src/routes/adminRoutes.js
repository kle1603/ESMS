import configs from "@/configs";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import User from "@/pages/User";

const adminRoutes = [
    {
        id: 1,
        path: configs.routes.admin,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        id: 2,
        path: configs.routes.adminUsers,
        component: User,
        layout: AdminLayout,
    },
];

export default adminRoutes;
