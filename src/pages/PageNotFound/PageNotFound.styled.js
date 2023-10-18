import Theme from "@/Theme";
import styled from "styled-components";

export const DivStyled = styled.div`
    width: 100vw;
    height: 100vh;
    /* position: relative; */
    background-color: #C4FCF0;

    .logo {
        position: absolute;
        top: 3%;
        left: 2%;
        border-radius: 12px;
        border: 3px solid #00A992;
        display: flex;
        justify-content: center;
        align-items: center;

        .image {
            margin: 6px 10px 6px 14px;
            width: 40px;
            height: 40px;
            overflow: hidden;

            .logo-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 14px;
            }
        }

        .logo-title {
            margin: 6px 14px 6px 0;
            font-size: 2rem;
            font-weight: 500;
        }
    }

    .wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .container {
            position: absolute;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            .title {
                font-size: 14rem;
                font-weight: 700;
                line-height: 130px;
                text-shadow: 4px 4px 0 #00c5a7;
            }

            .desc {
                margin-top: 20px;
                font-size: 4rem;
                font-weight: 700;
                color: #00a992;
            }

            .sub-desc {
                margin-top: 10px;
                font-size: 2rem;
                font-weight: 500;
                /* color: #00a992; */
            }

            .button {
                margin-top: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                border-radius: 1px;
                color: black;
                transition: all 0.1s ease;
                box-shadow: 0 0 0 2px #000, 2px 2px 0 2px #00c5a7;
                background-image: linear-gradient(45deg, #00e2c7, transparent);

                &:hover {
                    background-color: #00c5a7;
                    background-image: linear-gradient(
                        -45deg,
                        #00e2c7,
                        transparent
                    );
                    box-shadow: 0 0 0 2px #00c5a7, 2px 2px 0 2px #000;
                    border-color: #00c5a7;
                }

                .button-title {
                    font-size: 1.6rem;
                }
            }
        }
    }
`;
