// import PropTypes from "prop-types";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Event from "./Event";
import * as St from "./Schedule.styled";
import { useEffect, useState } from "react";
import ModalSchedule from "./ModalSchedule";
import instance from "@/utils/instance";

const localizer = momentLocalizer(moment);
// localizer.formats.timeGutterFormat = "H:mm";

const Schedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({});
    const [data, setData] = useState([]);
    const start = new Date(0, 0, 0, 7, 0, 0);
    const end = new Date(0, 0, 0, 19, 0, 0);

    const handleEvent = (event) => {
        setIsModalOpen(true);
        setEvent(event);
    };

    const eventPropGetter = ({ start }) => {
        const isPastEvent = start < new Date();

        const className = isPastEvent ? "past-event" : "future-event";

        return {
            className,
        };
    };

    const fetchData = () => {
        instance
            .get("examiners/allScheduled?userId=256")
            .then((res) => {
                // const formattedData = res.data.data.map((item, index) => ({
                //     ...item,
                //     id: index + 1,
                //     key: index + 1,
                // }));

                const formattedData = res.data.data.map((item, index) => {
                    item.startTime = new Date(item.startTime);
                    item.endTime = new Date(item.endTime);

                    return {
                        ...item,
                        id: index + 1,
                        key: index + 1,
                        start: item.startTime,
                        end: item.endTime,
                        title: item.roomLocation,
                    };
                });
                // console.log(formattedData);
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                events={data}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 578 }}
                min={start}
                max={end}
                eventPropGetter={eventPropGetter}
                onSelectEvent={handleEvent}
                popup
                defaultView="week"
                views={["month", "week", "day"]}
            />
        </div>
    );
};

Schedule.propTypes = {};

export default Schedule;
