import { Tabs } from "antd";
import styled from "styled-components";

export const TabsStyled = styled(Tabs)`
    .ant-tabs-tab {
        padding: 12px 20px;

        .ant-tabs-tab-btn {
            /* min-width: 100px; */
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .ant-tabs-nav-list {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    /* .ant-tabs-ink-bar {
        left: 0;
    } */
`;
