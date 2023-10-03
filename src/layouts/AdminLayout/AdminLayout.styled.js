import styled from "styled-components";
import { Layout } from "antd";
import Theme from "@/components/Theme";

const {Sider} = Layout;

export const StyleSider = styled(Sider) `

.ant-layout-sider-children {
        background-color: white;
        border: 2px solid #dfdfdf;
        box-shadow: 0px 2px 2px 2px #dfdfdf;
    }

.ant-menu {
    background-color: white;
    margin-top: 20px;
}

.ant-menu-title-content {
    font-family: ${Theme.font.primary_font};
}

.ant-menu-light .ant-menu-item-selected {
    background-color: ${Theme.color.main_background};
    color: white;

}


`