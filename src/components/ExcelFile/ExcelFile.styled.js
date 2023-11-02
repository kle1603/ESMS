import styled from "styled-components";

export const DivStyled = styled.div`
    input[type="file"] {
        display: none;
    }

    label {
        padding: 5px 10px 6px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        background-color: #ffffff;
        border-color: #d9d9d9;
        color: rgba(0, 0, 0, 0.88);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

        &:hover {
            color: #4096ff;
            border-color: #4096ff;
        }
    }

    .input {
        margin-right: 10px;
    }

    .download {
        margin-right: 10px;
    }
`;
