import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes";
import { Fragment } from "react";

const App = () => {
    return (
        <Routes>
            {adminRoutes.map((route) => {
                let Layout = Fragment;
                const Page = route.component;

                if (route.layout) {
                    Layout = route.layout;
                } else {
                    Layout = Fragment;
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
