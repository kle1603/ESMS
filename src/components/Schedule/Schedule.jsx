// import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { myEventsList } from "./ScheduleEvents";
import Event from "./Event";

const localizer = momentLocalizer(moment);

const Schedule = () => {
    return (
        <div>
            <Calendar
                components={{
                    header: ({ date }) => moment(date).format("ddd (DD/MM)"),
                    event: Event,
                }}
                enableAutoScroll
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 578 }}
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 18, 0, 0)}
                popup
            />
        </div>
    );
};

Schedule.propTypes = {};

export default Schedule;
