import configs from "@/configs";

import Login from "@/pages/Login";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUser from "@/pages/AdminUser";
import AdminSemesters from "@/pages/AdminSemesters";
import AdminSlots from "@/pages/AdminSlots";
import AdminSubjects from "@/pages/AdminSubjects";
import StaffDashboard from "@/pages/StaffDashboard";
import StaffLayout from "@/layouts/StaffLayout";
import StaffTestNaNe from "@/pages/StaffTestNaNe";
import StaffPending from "@/pages/StaffPending";
import StaffHistory from "@/pages/StaffHistory";

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
    {
        id: 7,
        path: configs.routes.staff,
        component: StaffDashboard,
        layout: StaffLayout,
    },
    {
        id: 8,
        path: configs.routes.staffTestNaNe,
        component: StaffTestNaNe,
        layout: StaffLayout,
    },
    {
        id: 9,
        path: configs.routes.staffPending,
        component: StaffPending,
        layout: StaffLayout,
    },
    {
        id: 10,
        path: configs.routes.staffHistory,
        component: StaffHistory,
        layout: StaffLayout,
    },
];

export default adminRoutes;
