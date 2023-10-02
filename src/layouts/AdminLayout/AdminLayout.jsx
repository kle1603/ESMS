import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as St from "./AdminLayout.styled.js";
import items from "./AdminLayout.items";
import { Content } from "antd/es/layout/layout";
import logo from "@/assets/images/Logo.svg";
import AdminHeader from "@/components/AdminHeader/index.js";
import { useState } from "react";
// import { useState } from "react";

const { Sider } = Layout;

const AdminLayout = ({ children }) => {
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(window.location.pathname);

    const handleClick = (e) => {
        navigate(e.key);
        setActiveKey(e.key);
    };

    const handleClickLogo = () => {
        navigate("/admin");
        setActiveKey("/admin");
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <St.SideDiv onClick={handleClickLogo}>
                    <div className="sidebar__image">
                        <img className="image" src={logo} alt="" />
                    </div>
                    <h1 className="sidebar__heading">MINIONS</h1>
                </St.SideDiv>
                <Menu
                    style={{ marginTop: "30px" }}
                    theme="dark"
                    // defaultSelectedKeys={[window.location.pathname]}
                    selectedKeys={[activeKey]}
                    mode="inline"
                    items={items}
                    onClick={handleClick}
                />
            </Sider>
            <Layout>
                <AdminHeader />
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
