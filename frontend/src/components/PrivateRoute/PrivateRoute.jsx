import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../../utilities/local-storage";

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
