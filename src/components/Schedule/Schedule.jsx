// import PropTypes from "prop-types";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { myEventsList } from "./ScheduleEvents";
import Event from "./Event";
import * as St from "./Schedule.styled";
import Theme from "@/Theme";
import { useState } from "react";
import ModalSchedule from "./ModalSchedule";

const localizer = momentLocalizer(moment);
// localizer.formats.timeGutterFormat = "H:mm";

const Schedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({});
    const start = new Date(0, 0, 0, 7, 0, 0);
    const end = new Date(0, 0, 0, 19, 0, 0);

    const handleEvent = (event) => {
        setIsModalOpen(true);
        setEvent(event);
    };

    const eventPropGetter = ({ start }) => {
        const isPastEvent = start < new Date(); // Kiểm tra nếu start là quá khứ
        let color_now = Theme.color.primary_color_background;
        let color_past = "#ccc";

        // Kết hợp style cho sự kiện
        const style = {
            backgroundColor: isPastEvent ? color_past : color_now,
        };

        return {
            style,
        };
    };

    return (
        <div>
            <ModalSchedule
                event={event}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <St.Calender
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
                min={start}
                max={end}
                eventPropGetter={eventPropGetter}
                onSelectEvent={handleEvent}
                popup
                defaultView="week"
                views={["week", "day"]}
            />
        </div>
    );
};

Schedule.propTypes = {};

export default Schedule;
