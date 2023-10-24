import styled from "styled-components";
import { Button, Table } from "antd";

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

export const StyledTable = styled(Table)`
    .ant-table-cell {
        height: 65px;
    }
`;
