import { Menu } from "antd";
import styled from "styled-components";

export const MenuLogo = styled(Menu)`
    color: red;
    background-color: white;
`;

export const SideDiv = styled.div`
    margin: 10px;
    height: 44px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00305e;
    border-radius: 10px;
    cursor: pointer;

    .sidebar__image {
        margin-right: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;

        .image {
            border-radius: 10px;
            width: 100%;
            height: 100%;
        }
    }

    .sidebar__heading {
        font-size: 1.8rem;
        color: white;
    }
`;
