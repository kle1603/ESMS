// import PropTypes from 'prop-types'
import { Button, Flex, Typography } from "antd";
import * as St from "./PageNotFound.styled";

import logo from "@/assets/images/Logo.svg";

const PageNotFound = () => {
    return (
        <St.DivStyled>
            <Flex className="logo">
                <Flex className="image">
                    <img className="logo-img" src={logo} />
                </Flex>
                <Typography className="logo-title">MINIONS</Typography>
            </Flex>

            <Flex className="wrapper">
                <Flex className="container">
                    <Typography className="title">404</Typography>
                    <Typography className="desc">PAGE NOT FOUND!</Typography>
                    <Typography className="sub-desc">Sorry! We can't find the page you are looking for.</Typography>
                    <Button className="button">
                        <Typography className="button-title">LOGIN PAGE</Typography>
                    </Button>
                </Flex>
            </Flex>
        </St.DivStyled>
    );
};

PageNotFound.propTypes = {};

export default PageNotFound;
