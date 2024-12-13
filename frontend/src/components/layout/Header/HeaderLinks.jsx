import { authCheckLogin } from "../../../api/auth";
import HeaderLink from "./HeaderLink";

export default function HeaderLinks() {
	function logout() {
		window.localStorage.clear();
		window.location.replace("/");
	}

	return (
		<>
			{authCheckLogin() ? (
				<>
					<li>
						<HeaderLink to={"/"} text={"Home"} />
					</li>
					<li>
						<HeaderLink to={"/employees"} text={"Employees"} />
					</li>
					<li>
						<HeaderLink to={"/interviews"} text={"Interviews"} />
					</li>
					<li>
						<HeaderLink to={"/positions"} text={"Positions"} />
					</li>
					<li onClick={logout}>
						<p>Logout</p>
					</li>
				</>
			) : (
				<>
					<li>
						<HeaderLink to={"/"} text={"Home"} />
					</li>
					<li>
						<HeaderLink to={"/login"} text={"Login"} />
					</li>
				</>
			)}
		</>
	);
}
