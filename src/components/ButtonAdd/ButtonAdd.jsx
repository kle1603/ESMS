import PropTypes from "prop-types";
import * as St from "./ButtonAdd.styled";

const ButtonAdd = ({ setModalVisible,title}) => {
    const handleAdd = () => {
        setModalVisible(true);
    };
    return (
        <St.DivStyled>
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                {title}
            </St.ButtonTable>
        </St.DivStyled>
    );
};

ButtonAdd.propTypes = {
    setModalVisible: PropTypes.func,
    title: PropTypes.string
};

export default ButtonAdd;
