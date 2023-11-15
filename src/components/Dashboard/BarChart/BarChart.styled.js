import { Card } from "antd";
import styled from "styled-components";

export const CardStyled = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 400px;

    .ant-card-body {
        width: 100%;
        height: 100%;
    }

    .chart {
        width: 100%;
        height: 100%;
    }
`;
