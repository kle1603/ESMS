import Theme from "@/Theme";
import styled from "styled-components";

export const DivLogin = styled.div`
    height: 100vh;
    background: #eef5ff;

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
        margin: 12px 0;
        font-size: 3rem;
        color: ${Theme.color.black_1};
    }

    .login-desc {
        position: relative;
        margin: 20px 0;
        font-size: 1.6rem;
        color: ${Theme.color.black_1};
        font-weight: 400;

        &::after {
            position: absolute;
            bottom: -25px;
            left: calc(50% - 50px);
            content: "";
            width: 100px;
            height: 1px;
            background-color: ${Theme.color.black_1};
        }
    }

    .login-button {
        margin-top: 71px;
        padding: 8px 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        cursor: pointer;

        .button {
            padding: 10px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            width: 100%;
            border-radius: 35px;
            align-items: center;
            border: solid black 2px;
            outline: none;
        }

        .svg {
            height: 25px;
            margin-right: 10px;
        }

        .button .text {
            z-index: 10;
            font-size: 14px;
        }

        .button:hover .text {
            animation: text forwards 0.3s;
            /*color: white;*/
        }

        @keyframes text {
            from {
                color: black;
            }

            to {
                color: white;
            }
        }

        .svg {
            z-index: 6;
        }

        .button:hover::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 9%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            opacity: 0;
            border-radius: 300px;
            animation: wave1 2.5s ease-in-out forwards;
        }

        .button:hover::after {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 9%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            opacity: 0;
            border-radius: 300px;
            animation: wave2 2.5s ease-in-out forwards;
        }

        @keyframes wave1 {
            0% {
                z-index: 1;
                background: #eb4335;
                width: 0;
                height: 0;
                opacity: 1;
            }

            1% {
                z-index: 1;
                background: #eb4335;
                width: 0;
                height: 0;
                opacity: 1;
            }

            25% {
                z-index: 1;
                background: #eb4335;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            26% {
                z-index: 3;
                background: #34a853;
                width: 0;
                height: 0;
                opacity: 1;
            }

            50% {
                z-index: 3;
                background: #34a853;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            70% {
                z-index: 3;
                background: #34a853;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            100% {
                z-index: 3;
                background: #34a853;
                width: 800px;
                height: 800px;
                opacity: 1;
            }
        }

        @keyframes wave2 {
            0% {
                z-index: 2;
                background: #fbbc05;
                width: 0;
                height: 0;
                opacity: 1;
            }

            11% {
                z-index: 2;
                background: #fbbc05;
                width: 0;
                height: 0;
                opacity: 1;
            }

            35% {
                z-index: 2;
                background: #fbbc05;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            39% {
                z-index: 2;
                background: #fbbc05;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            40% {
                z-index: 4;
                background: #4285f4;
                width: 0;
                height: 0;
                opacity: 1;
            }

            64% {
                z-index: 4;
                background: #4285f4;
                width: 800px;
                height: 800px;
                opacity: 1;
            }

            100% {
                z-index: 4;
                background: #4285f4;
                width: 800px;
                height: 800px;
                opacity: 1;
            }
        }

        .button:hover .red {
            animation: disappear 0.1s forwards;
            animation-delay: 0.1s;
        }

        .button:hover .yellow {
            animation: disappear 0.1s forwards;
            animation-delay: 0.3s;
        }

        .button:hover .green {
            animation: disappear 0.1s forwards;
            animation-delay: 0.7s;
        }

        .button:hover .blue {
            animation: disappear 0.1s forwards;
            animation-delay: 1.1s;
        }

        @keyframes disappear {
            from {
                filter: brightness(1);
            }

            to {
                filter: brightness(100);
            }
        }
    }

    .login-contact {
        margin-top: 100px;
        padding-bottom: 20px;

        .login-contact-link {
            cursor: pointer;
            color: ${Theme.color.blue_5};
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
            background: ${Theme.color.blue_5};
            transition: all 0.25s linear 0s;
        }
        a:hover::before {
            width: 100%;
            left: 0;
            top: 100%;
        }
    }
`;
