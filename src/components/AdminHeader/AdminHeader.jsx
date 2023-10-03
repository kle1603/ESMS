import PropTypes from "prop-types";
import { Avatar, Badge, Layout, Space } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import * as St from "./AdminHeader.styled";
import PopUpOver from "../PopUpOver";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/Logo.svg";

const { Header } = Layout;

const AdminHeader = ({ setActiveKey }) => {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate("/admin");
        setActiveKey("/admin");
    };

    return (
        <Header
            style={{
                padding: 0,
                background: "white",
            }}
        >
            <Space
                align="center"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <St.SideDiv onClick={handleClickLogo}>
                    <div className="sidebar__image">
                        <img className="image" src={logo} alt="" />
                    </div>
                    <h1 className="sidebar__heading">MINIONS</h1>
                </St.SideDiv>
                <Space align="center">
                    <PopUpOver>
                        <Badge dot count={5} offset={[-8, 0]}>
                            <BellOutlined
                                style={{
                                    fontSize: "2rem",
                                    paddingRight: "10px",
                                }}
                            />
                        </Badge>
                    </PopUpOver>

                    <St.DivAvatar>
                        <div className="avatar__wrapper">
                            <div className="avatar__content">
                                <h3 className="avatar__title">Ngoc Anh</h3>
                                <p className="avatar__desc">
                                    nanalala@gmail.com
                                </p>
                            </div>
                            <Avatar
                                className="avatar__icon"
                                size="large"
                                icon={<UserOutlined />}
                            />
                        </div>
                    </St.DivAvatar>
                </Space>
            </Space>
        </Header>
    );
};

AdminHeader.propTypes = {
    setActiveKey: PropTypes.func.isRequired,
};

export default AdminHeader;
