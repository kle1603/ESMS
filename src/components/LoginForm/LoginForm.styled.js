import styled from "styled-components";

export const DivLogin = styled.div`
    height: 100vh;
    background: #e3e3e3;

    .login__container {
        height: 100%;
        width: 430px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login__inner {
        width: 100%;
        border-radius: 20px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .login-image {
        margin-top: 70px;
        width: 200px;
        height: 200px;
        flex-shrink: 0;
    }

    .login-heading {
        margin:12px 0;
        font-size: 3rem;
        color: #000000;
    }

    .login-desc {
        position: relative;
        margin: 20px 0;
        font-size: 1.6rem;
        color: #000000;
        font-weight: 400;

        &::after {
            position: absolute;
            bottom: -25px;
            left: calc(50% - 50px);
            content: "";
            width: 100px;
            height: 1px;
            background-color: #000000;
        }
    }

    .login-button {
        margin-top: 71px;
        padding: 8px 26px;
        display: flex;

        border-radius: 20px;
        border: 1px solid #cdc6c6;
        box-shadow: 1px 2px 2px #cdc6c6;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        color: #000000;
        font-weight: 500;

        .login-logo {
            padding-right: 10px;
        }

        &:hover {
            background-color: #90caf9;
            color: white;
            border: 1px solid white;
        }
    }

    .login-contact {
        margin-top: 125px;
        padding-bottom: 20px;

        .login-contact-link {
            cursor: pointer;
            color: #90caf9;
        }

        a {
            position: relative;
        }

        a::before {
            position: absolute;
            display: block;
            content: "";
            right: 0;
            top: 100%;
            width: 0;
            height: 2.3px;
            opacity: 0.75;
            background: #90caf9;
            transition: all 0.25s linear 0s;
        }
        a:hover::before {
            width: 100%;
            left: 0;
            top: 100%;
        }
    }
`;
