import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../../utilities/auth-token";

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const token = getUserToken();

    function evalCurrentUser() {
        if (!token) {
            return navigate("/auth");
        }
    }
    useEffect(() => {
        evalCurrentUser();
    }, []);

    return children;

}

export default PrivateRoute;
