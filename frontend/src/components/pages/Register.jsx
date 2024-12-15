import { useState } from "react";
import { getApi } from "../../api/apiInstance";

export default function Register() {
	const api = getApi();

	const [err, setErr] = useState("");

	const [username, setUsername] = useState("admin");
	const [password, setPassword] = useState("adminpass");

	async function register() {
		try {
			const data = await api.post("auth/register", {
				username,
				password,
			});
			alert("User registered successfully!")

		} catch (error) {
			alert(error.response.data);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="card bg-base-200 w-80">
				{err && (
					<div role="alert" className="alert alert-error">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{err}</span>
					</div>
				)}

				<div className="card-body">
					<input
						defaultValue={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						placeholder="Username"
						className="input input-bordered"
					/>
					<input
						defaultValue={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
						placeholder="Password"
						className="input input-bordered"
					/>

					<button onClick={register} className="btn btn-neutral">
						Register
					</button>
				</div>
			</div>
		</div>
	);
}
