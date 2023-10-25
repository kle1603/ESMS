const routes = {
    login: "/",
    admin: "/admin",
    adminSemesters: "/admin/semesters",
    adminSubjects: "/admin/subjects",
    adminPhases: "/admin/phases",
    adminUsers: "/admin/users",
    adminCourses: "/admin/courses",
    adminRooms: "/admin/rooms",
    adminExaminers: "/admin/examiners",
    adminSlots: "/admin/slots",
    staff: "/staff",
    staffExaminer: "/staff/examiners",
    staffExamPhase: "/staff/examPhase",
    staffExamPhaseDetail: "/staff/examPhase/:id",
    lecturer: "/lecturer",
    lecturerRegister: "/lecturer/register",
    lecturerExamSlots: "/lecturer/examSlots",
    lecturerSchedule: "/lecturer/schedule",
    pageNotFound: "/*",
};

export default routes;
