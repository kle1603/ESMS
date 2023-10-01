import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes";

const App = () => {
    return (
        <Routes>
            {adminRoutes.map((route) => {
                let Layout = <></>;
                const Page = route.component;

                if (route.layout) {
                    Layout = route.layout;
                } else {
                    Layout = <></>;
                }

                return (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default App;
