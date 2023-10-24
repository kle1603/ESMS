// import PropTypes from "prop-types";
import { Avatar, Badge, Layout, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import * as St from "./HeaderLayout.styled";
import PopUpOver from "../PopUpOver";
import avatar from "../../assets/images/avatar.jpg";
// import jwtDecode from "jwt-decode";
// import { useEffect, useState } from "react";

const { Header } = Layout;

const AdminHeader = () => {
    // const token = document.cookie; // Thay thế 'your-token-here' bằng token thực tế của bạn
    // const [decode, setDecode] = useState([]);

    // useEffect(() => {
    //     const result = jwtDecode(token);
    //     setDecode(result);
    // }, []);

    return (
        <Header
            style={{
                margin: "0 15px",
                padding: 0,
                background: "white",
            }}
        >
            <Space
                align="center"
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Space align="center">
                    <PopUpOver>
                        <Badge dot count={5} offset={[-8, 0]}>
                            <BellOutlined
                                style={{
                                    cursor: "pointer",
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
                                <p className="avatar__desc">hahahahahaha</p>
                            </div>
                            <Avatar
                                className="avatar__icon"
                                size="large"
                                // icon={<UserOutlined />}
                                src={avatar}
                            />
                        </div>
                    </St.DivAvatar>
                </Space>
            </Space>
        </Header>
    );
};

AdminHeader.propTypes = {};

export default AdminHeader;
