import Logo from "@/assets/images/Schedule-amico.svg";
import Google from "@/assets/images/Group.svg";
import * as St from "./LoginForm.styled";

function Login() {
    return (
        <St.DivLogin className="login">
            <div className="login__container">
                <div className="login__inner">
                    <img className="login-image" src={Logo} alt="" />
                    <h1 className="login-heading">Login</h1>
                    <h2 className="login-desc">
                        Join to create the future with us
                    </h2>
                    <a
                        // href="http://localhost:3006/auth/google"
                        className="login-button"
                    >
                        <img className="login-logo" src={Google} alt="" />
                        <p className="login-button-desc">Login with Google</p>
                    </a>
                    <div className="login-contact">
                        <p>
                            Cannot login?{" "}
                            <a className="login-contact-link">Contact admin</a>
                        </p>
                    </div>
                </div>
            </div>
        </St.DivLogin>
    );
}

export default Login;
