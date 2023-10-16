import Theme from "@/Theme";
import { Calendar } from "react-big-calendar";
import styled from "styled-components";

export const Calender = styled(Calendar)`
    .rbc-time-header-cell {
        .rbc-header {
            display: flex;
            justify-content: center;
            align-items: center;

            .rbc-button-link {
                font-weight: 600;
                font-size: 1.4rem;
            }
        }
    }

    .rbc-toolbar button {
        transition: all 0.3s ease-in-out;
        border: 1px solid #ccc;
        overflow: hidden;

        &:hover {
            color: #fff;
            background-color: #1677ff;
        }

        &:focus {
            color: #fff;
            background-color: #1677ff;
        }
    }

    .rbc-toolbar button:active,
    .rbc-toolbar button.rbc-active {
        background-image: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: #fff;
        background-color: #1677ff;
    }

    .rbc-row-segment {
        transition: all 0.3s ease-in-out;

        &:hover {
            opacity: 0.9;
        }

        .rbc-event {
            .title {
                color: #fff;
            }
        }
    }

    .rbc-agenda-table {
        color: ${Theme.color.primary_color};

        .title {
            color: #fff;
        }
    }

    .rbc-events-container {
        width: 100%;

        .rbc-event {
            transition: all 0.3s ease-in-out;

            &:hover {
                opacity: 0.9;
            }

            .title {
                color: ${Theme.color.primary_color};
            }
        }
    }

    .rbc-event:focus,
    .rbc-day-slot .rbc-background-event:focus {
        outline: none;
    }

    .rbc-agenda-event-cell {
        cursor: pointer;
    }
`;
