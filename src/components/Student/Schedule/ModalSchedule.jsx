import PropTypes from "prop-types";
import { Modal, Typography } from "antd";

const ModalSchedule = ({ event, isModalOpen, setIsModalOpen }) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                title="Schedule detail"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Typography>Subject Code: {event.subCode}</Typography>
            </Modal>
        </div>
    );
};

ModalSchedule.propTypes = {
    event: PropTypes.object,
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
};

export default ModalSchedule;
