// import PropTypes from "prop-types";

import { Typography } from "antd";

const Event = ({ event }) => {
    return (
        <div>
            <Typography className="title">Subject: {event.title}</Typography>
            <Typography className="title">Status: {event.status}</Typography>
        </div>
    );
};

Event.propTypes = {};

export default Event;
