import { Calendar } from "react-big-calendar";
import styled from "styled-components";

export const Calender = styled(Calendar)`
    & .rbc-day-slot .rbc-event,
    .rbc-day-slot .rbc-background-event {
        border: transparent;
    }

    & .rbc-timeslot-group {
        min-height: 70px;
    }

    & .rbc-day-slot .rbc-event {
        /* border: 3px solid #ccc; */
        border-left: 5px solid #1b5500;
        border-top: 3px solid #ccc;
    }

    & .rbc-event {
        margin-left: 6px;

        .title {
            color: #fff;
        }

        .rbc-event-content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    & .rbc-event-label {
        font-size: 1rem;
    }

    & .rbc-event-label,
    & .rbc-allday-cell {
        display: none;
    }

    & .rbc-timeslot-group {
        border-bottom-color: #ccc;
    }

    /* Custom toolbar */
    & .rbc-btn-group {
        background-color: #ddd;
        padding: 4px;
        border-radius: 6px;

        & > button[type="button"] {
            box-shadow: none;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        & > .rbc-active {
            background-color: #fff;
        }
    }

    & .rbc-toolbar button:active:hover,
    & .rbc-toolbar button:active:focus,
    & .rbc-toolbar button.rbc-active:hover,
    & .rbc-toolbar button.rbc-active:focus,
    & .rbc-toolbar button:focus {
        background-color: #fff;
    }

    & .rbc-toolbar-label {
    }

    & .rbc-current-time-indicator {
        background-color: green;
    }
`;
