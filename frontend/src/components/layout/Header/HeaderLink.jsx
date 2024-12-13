import { NavLink } from "react-router";

export default function HeaderLink({text, to}) {
	return <NavLink to={to}>{text}</NavLink>;
}
