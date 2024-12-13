import axios from "axios";

export function getApi() {
	const API_BASE_URL = import.meta.env.API_BASE_URL || "https://localhost:7024/api/";
	const token = window.localStorage.getItem("token");

	const api = axios.create({
		baseURL: API_BASE_URL,
		headers: { Authorization: `Bearer ${token}` },
	});

    return api;
}
