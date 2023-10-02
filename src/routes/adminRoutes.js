import configs from "@/configs";

import Login from "@/pages/Login";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUser from "@/pages/AdminUser";
import AdminSemesters from "@/pages/AdminSemesters";
import AdminSlots from "@/pages/AdminSlots";
import AdminSubjects from "@/pages/AdminSubjects";

const adminRoutes = [
    {
        id: 1,
        path: configs.routes.login,
        component: Login,
        layout: null,
    },
    {
        id: 2,
        path: configs.routes.admin,
        component: AdminDashboard,
        layout: AdminLayout,
    },
    {
        id: 3,
        path: configs.routes.adminUsers,
        component: AdminUser,
        layout: AdminLayout,
    },
    {
        id: 4,
        path: configs.routes.adminSemesters,
        component: AdminSemesters,
        layout: AdminLayout,
    },
    {
        id: 5,
        path: configs.routes.adminSlots,
        component: AdminSlots,
        layout: AdminLayout,
    },
    {
        id: 6,
        path: configs.routes.adminSubjects,
        component: AdminSubjects,
        layout: AdminLayout,
    },
];

export default adminRoutes;
