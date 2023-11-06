import Logo from "@/assets/images/Schedule-amico.svg";
import Google from "@/assets/images/Group.svg";
import * as St from "./LoginForm.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
import configs from "@/configs";

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const errorMessage = query.get("error_message");
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: "error",
                content: <div>{errorMessage}</div>,
            });
            navigate(configs.routes.login);
        }
    }, [errorMessage]);

    return (
        <>
            {contextHolder}
            <St.DivLogin className="login">
                <div className="login__container">
                    <div className="login__inner">
                        <img className="login-image" src={Logo} alt="" />
                        <h1 className="login-heading">Login</h1>
                        <h2 className="login-desc">
                            Join to create the future with us
                        </h2>
                        <a
                            href="http://localhost:8080/auth/google"
                            className="login-button"
                        >
                            <img className="login-logo" src={Google} alt="" />
                            <p className="login-button-desc">
                                Login with Google
                            </p>
                        </a>
                        <div className="login-contact">
                            <p>
                                Cannot login?{" "}
                                <a className="login-contact-link">
                                    Contact admin
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </St.DivLogin>
        </>
    );
}

export default Login;
