import configs from "@/configs";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUser from "@/pages/AdminUser";

const adminRoutes = [
    {
        element: <AdminLayout />,
        children: [
            { path: configs.routes.admin, element: <AdminDashboard /> },
            { path: configs.routes.adminUsers, element: <AdminUser /> },
        ],
    },
];

export default adminRoutes;
