// import PropTypes from "prop-types";

import { Typography } from "antd";

const Event = ({ event }) => {
    return (
        <div>
            <Typography className="title">Hi: {event.title}</Typography>
        </div>
    );
};

Event.propTypes = {};

export default Event;
