import configs from "@/configs";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p>Login</p>
            <Button onClick={() => navigate(configs.routes.admin)}>
                Hello
            </Button>
        </div>
    );
};

export default Login;
