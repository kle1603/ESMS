import PropTypes from "prop-types";
import { Modal } from "antd";

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
                <p>{event.title}</p>
                <p>{event.staff}</p>
                <p>{event.phone}</p>
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
