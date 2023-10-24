import configs from "@/configs";

import Login from "@/pages/Login";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUser from "@/pages/AdminUser";
import AdminSemesters from "@/pages/AdminSemesters";
import AdminSubjects from "@/pages/AdminSubjects";
import StaffDashboard from "@/pages/StaffDashboard";
import StaffLayout from "@/layouts/StaffLayout";
import StaffExamPhase from "@/pages/StaffExamPhase";
import LecturerLayout from "@/layouts/LecturerLayout";
import LecturerDashboard from "@/pages/LecturerDashboard";
import StaffExamRoom from "@/pages/StaffExamRoom";
import AdminCourses from "@/pages/AdminCourses";
import AdminRoom from "@/pages/AdminRoom";
import LecturerSchedule from "@/pages/LecturerSchedule";
import LecturerRegister from "@/pages/LecturerRegister";
import PageNotFound from "@/pages/PageNotFound";
import LecturerExamSlots from "@/pages/LecturerExamSlots";
import AdminPhases from "@/pages/AdminPhases";
import AdminExaminers from "@/pages/AdminExaminers";

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
        path: configs.routes.adminPhases,
        component: AdminPhases,
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
        path: configs.routes.adminCourses,
        component: AdminCourses,
        layout: AdminLayout,
    },
    {
        id: 8,
        path: configs.routes.adminRooms,
        component: AdminRoom,
        layout: AdminLayout,
    },
    {
        id: 9,
        path: configs.routes.adminExaminers,
        component: AdminExaminers,
        layout: AdminLayout,
    },
    {
        id: 10,
        path: configs.routes.staff,
        component: StaffDashboard,
        layout: StaffLayout,
    },
    {
        id: 11,
        path: configs.routes.staffExamPhase,
        component: StaffExamPhase,
        layout: StaffLayout,
    },
    {
        id: 12,
        path: configs.routes.staffExamRoom,
        component: StaffExamRoom,
        layout: StaffLayout,
    },
    {
        id: 13,
        path: configs.routes.lecturer,
        component: LecturerDashboard,
        layout: LecturerLayout,
    },
    {
        id: 14,
        path: configs.routes.lecturerRegister,
        component: LecturerRegister,
        layout: LecturerLayout,
    },
    {
        id: 15,
        path: configs.routes.lecturerExamSlots,
        component: LecturerExamSlots,
        layout: LecturerLayout,
    },
    {
        id: 16,
        path: configs.routes.lecturerSchedule,
        component: LecturerSchedule,
        layout: LecturerLayout,
    },
    {
        id: 17,
        path: configs.routes.pageNotFound,
        component: PageNotFound,
        layout: null,
    },
    {
        id: 18,
        path: configs.routes.adminSlots,
        component: AdminSlots,
        layout: AdminLayout,
    },
];

export default adminRoutes;
