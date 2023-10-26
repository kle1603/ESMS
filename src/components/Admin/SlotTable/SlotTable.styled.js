import { Button, Flex, Table } from "antd";
import styled from "styled-components";

export const DivSlot = styled.div`
    margin-top: 20px;
    padding-top: 40px;
    position: relative;

    .ant-btn-default {
        font-family: Roboto Slab;
    }

    .ant-btn-primary {
        font-family: Roboto Slab;
    }

    .ant-form-item .ant-form-item-explain-error{
        font-family: Roboto Slab;
    }

    .ant-picker-dropdown .ant-picker-ranges {
        font-family: Roboto Slab;

    }
`;

export const StyledLeft = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
        margin-right: 10px;
        font-family: Roboto Slab;
    }

    .ant-select-selection-item {
        font-family: Roboto Slab;
    }
`;

export const ButtonRight = styled(Button)`
    position: absolute;
    right: 0;
    top: 0;
    /* background-color: red; */
`;

export const SlotTable = styled(Table)`
    margin-top: 10px;
    .ant-table-cell {
        font-family: Roboto Slab;
    }

    .ant-typography {
        font-family: Roboto Slab;
    }

    .ant-picker {
        width: 100%;
    }

    .ant-tag-green{
        font-family: Roboto Slab;
    }

    .ant-tag-red{
        font-family: Roboto Slab;
    }
`;
