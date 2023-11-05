import useScrollTop from "@/hooks/useScrollTop";
import { useRoutes } from "react-router-dom";
import lecturerRoutes from "./lecturerRoutes";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import staffRoutes from "./staffRoutes";

const Router = () => {
    useScrollTop();

    return useRoutes([
        ...lecturerRoutes,
        ...publicRoutes,
        ...adminRoutes,
        ...staffRoutes,
    ]);
};

export default Router;
