// import PropTypes from "prop-types";
import { Avatar, Badge, Layout, Space } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import * as St from "./AdminHeader.styled";
import PopUpOver from "../PopUpOver";

const { Header } = Layout;

const AdminHeader = () => {
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
                                    nanashilamomohaha
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

AdminHeader.propTypes = {};

export default AdminHeader;
