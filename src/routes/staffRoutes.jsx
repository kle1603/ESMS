import configs from "@/configs";
import AuthGuard from "@/guards/AuthGuard";
import RoleBasedGuard from "@/guards/RoleBasedGuard";
import StaffLayout from "@/layouts/StaffLayout";
import StaffDashboard from "@/pages/Staff/StaffDashboard";
import StaffExamPhase from "@/pages/Staff/StaffExamPhase";
import StaffExamSlot from "@/pages/Staff/StaffExamSlot";
import StaffExamSlotDetail from "@/pages/Staff/StaffExamSlotDetail";
import StaffExaminer from "@/pages/Staff/StaffExaminer";
import { STAFF } from "@/utils/constants";

const staffRoutes = [
    {
        element: (
            <AuthGuard>
                <RoleBasedGuard accessibleRoles={[STAFF]}>
                    <StaffLayout />
                </RoleBasedGuard>
            </AuthGuard>
        ),
        children: [
            { path: configs.routes.staff, element: <StaffDashboard /> },
            {
                path: configs.routes.staffExamPhase,
                element: <StaffExamPhase />,
            },
            { path: configs.routes.staffExamSlot, element: <StaffExamSlot /> },
            {
                path: configs.routes.staffExamSlotDetail,
                element: <StaffExamSlotDetail />,
            },
            { path: configs.routes.staffExaminer, element: <StaffExaminer /> },
        ],
    },
];

export default staffRoutes;
