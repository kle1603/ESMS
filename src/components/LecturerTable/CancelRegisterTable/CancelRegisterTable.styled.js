import { Button, Space } from "antd";
import styled from "styled-components";

export const DivTable = styled.div`
    margin-top: 20px;
    padding-top: 50px;
    position: relative;
`;

export const ButtonTable = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;

export const SpaceStyled = styled(Space)`
    position: absolute;
    top: 0;
    left: 0;

    width: 400px;

    .ant-space-item {
        width: 100%;
    }
`;
