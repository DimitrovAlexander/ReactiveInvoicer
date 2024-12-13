import { authCheckLogin, authGetName } from "../../api/auth";
import ThemeSwitch from "./Header/ThemeSwitch";

export default function Header() {
	return (
		<div className="navbar bg-base-100">
			<label htmlFor="my-drawer-2" className="btn">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
				</svg>
			</label>
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">Reactive Invoicer</a>
			</div>
			<div className="navbar-end gap-4">
				<p>{authCheckLogin() ? `Hello, ${authGetName()}` : ""}</p>
				<ThemeSwitch />
			</div>
		</div>
	);
}
