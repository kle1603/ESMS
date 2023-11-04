import configs from "@/configs";
import GuestGuard from "@/guards/GuestGuard";
import Login from "@/pages/Login";

const publicRoutes = [
    {
        path: configs.routes.login,
        element: (
            <GuestGuard>
                <Login />
            </GuestGuard>
        ),
    },
];

export default publicRoutes;
