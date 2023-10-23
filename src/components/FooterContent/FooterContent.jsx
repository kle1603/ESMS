// import PropTypes from 'prop-types'
import { Flex, Typography } from "antd";
// import * as St from "./FooterContent.styled";
// import { Footer } from "antd/es/layout/layout.js";
import { LiaCopyrightSolid } from "react-icons/lia";

const FooterContent = () => {
    return (
        <Flex>
            <Flex>
                <Typography className="footer-logo">MINIONS</Typography>
            </Flex>

            <Flex>
                <Typography className="title">Nam mô a di đà phật</Typography>
                <Flex>
                    <Typography>2023</Typography>
                    <LiaCopyrightSolid />
                </Flex>
            </Flex>
        </Flex>
    );
};

FooterContent.propTypes = {};

export default FooterContent;
