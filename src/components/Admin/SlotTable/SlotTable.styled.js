import Theme from "@/Theme";
import { Button, Flex, Table } from "antd";
import styled from "styled-components";

export const DivSlot = styled.div`
    margin-top: 20px;
    padding-top: 40px;
    position: relative;

    .ant-btn-default {
        font-family: ${Theme.font.primary_font};
    }

    .ant-btn-primary {
        font-family: ${Theme.font.primary_font};
    }

    .ant-form-item .ant-form-item-explain-error {
        font-family: ${Theme.font.primary_font};
    }

    .ant-picker-dropdown .ant-picker-ranges {
        font-family: ${Theme.font.primary_font};
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

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        line-height: 1;
        font-weight: 500;
        font-family: ${Theme.font.primary_font};
    }

    .ant-select-selection-item {
        font-family: ${Theme.font.primary_font};
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
        font-family: ${Theme.font.primary_font};
    }

    .ant-typography {
        font-family: ${Theme.font.primary_font};
    }

    .ant-picker {
        width: 100%;
    }

    .ant-tag-green {
        font-family: ${Theme.font.primary_font};
    }

    .ant-tag-red {
        font-family: ${Theme.font.primary_font};
    }
`;
