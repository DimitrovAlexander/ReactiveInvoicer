import { NavLink } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import HeaderLinks from "./Header/HeaderLinks";

export default function Layout(props) {
	return (
		<div>
			<div className="drawer">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col items-center justify-center">
					<Header />
					<div className="min-h-screen">{props.children}</div>
					<Footer />
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
						<HeaderLinks />
					</ul>
				</div>
			</div>
		</div>
	);
}
