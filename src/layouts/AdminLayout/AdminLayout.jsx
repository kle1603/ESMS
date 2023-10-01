import PropTypes from "prop-types";
// import { useState } from "react";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";

import Logo from "@/assets/images/Logo.svg";
import * as St from "./AdminLayout.styled";
import items from "./AdminLayout.items";
import { Content } from "antd/es/layout/layout";

const { Sider, Header } = Layout;

const AdminLayout = ({ children }) => {
    // const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(e.key);
    };

    const handleClickLogo = () => {
        // console.log('hello');
        navigate("/admin");
    };
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <St.SideDiv onClick={handleClickLogo}>
                    <div className="sidebar__image">
                        <img className="image" src={Logo} alt="" />
                    </div>
                    <h1 className="sidebar__heading">MINIONS</h1>
                </St.SideDiv>
                <Menu
                    style={{ marginTop: "30px" }}
                    theme="dark"
                    defaultSelectedKeys={[window.location.pathname]}
                    mode="inline"
                    items={items}
                    onClick={handleClick}
                />
            </Sider>
            <Layout>
                <Header />
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        backgroundColor: "white",
                        overflow: "auto", // Thêm dòng này
                        height: "calc(100vh - 64px)", // Đảm bảo Content không vượt quá chiều cao viewport
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
