import Theme from "@/Theme";
import { Calendar } from "react-big-calendar";
import styled from "styled-components";

export const Calender = styled(Calendar)`
    .rbc-time-header-cell {
        .rbc-header {
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;

            .rbc-button-link {
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
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
`;
