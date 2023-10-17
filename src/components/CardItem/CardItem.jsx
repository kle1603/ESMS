// import PropTypes from "prop-types";

import { Card } from "antd";

const CardItem = () => {
    return (
        <div>
            <Card hoverable bordered={true}>
                Card content
            </Card>
        </div>
    );
};

CardItem.propTypes = {};

export default CardItem;
