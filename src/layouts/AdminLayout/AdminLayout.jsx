import {  Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import items from "./AdminLayout.items";

import AdminHeader from "@/components/AdminHeader/index.js";
import { useState } from "react";
// import { useState } from "react";
import * as St from "./AdminLayout.styled";

const { Content } = Layout;

const AdminLayout = ({ children }) => {
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(window.location.pathname);

    const handleClick = (e) => {
        navigate(e.key);
        setActiveKey(e.key);
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <AdminHeader setActiveKey={setActiveKey} />
            <Layout>
                <St.StyleSider breakpoint="lg" collapsedWidth="0">
                    <Menu
                        // defaultSelectedKeys={[window.location.pathname]}
                        selectedKeys={[activeKey]}
                        mode="inline"
                        items={items}
                        onClick={handleClick}
                    />
                </St.StyleSider>
                <Content
                    style={{
                        margin: "16px",
                        padding: 24,
                        backgroundColor: "white",
                        overflowY: "auto", // Cho phép cuộn nếu nội dung vượt quá chiều cao
                        height: "calc(100vh - 64px - 24px)", // Trừ đi chiều cao của Header và margin của Content
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
