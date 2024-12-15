import { Navigate, Route } from "react-router";
import { authCheckLogin } from "../api/auth";

const PrivateRoute = ({ children }) => {
	// Add your own authentication on the below line.
	const isLoggedIn = authCheckLogin();

	return isLoggedIn ? children : <Navigate to={{ pathname: "/" }} />;
};

export default PrivateRoute;
