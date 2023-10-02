import styled from "styled-components";

export const DivAvatar = styled.div`
    margin-right: 30px;

    .avatar__wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-color: #ccc;
        height: 50px;

        border-radius: 999px;
    }

    .avatar__icon {
        margin-right: 4px;
    }

    .avatar__content {
        padding: 0px 10px 0px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .avatar__title {
            margin-bottom: 4px;
            line-height: 1.8rem;
            font-size: 1.6rem;
        }

        .avatar__desc {
            line-height: 1.6rem;
            font-size: 1.4rem;
        }
    }
`;
