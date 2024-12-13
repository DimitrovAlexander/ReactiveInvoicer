import { jwtDecode } from "jwt-decode";

export function authCheckLogin() {
	const token = window.localStorage.getItem("token");
	if (token) return true;
	return false;
}

export function authGetName() {
	const token = window.localStorage.getItem("token");
	if (token) {
		const data = jwtDecode(token);
		return data.unique_name;
	}
	return "";
}
