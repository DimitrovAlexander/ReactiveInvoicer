import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import PartnersPage from "./components/pages/Partners/PartnersPage";
import Login from "./components/pages/Login";
import InvoicesPage from "./components/pages/Invoices/InvoicesPage";
import InvoicesOnePage from "./components/pages/Invoices/InvoicesOnePage";
import PartnersOnePage from "./components/pages/Partners/PartnersOnePage";
import InvoiceAddPayment from "./components/pages/Invoices/crud/InvoiceAddPayment";
import InvoiceEdit from "./components/pages/Invoices/crud/InvoiceEdit";
import PartnersEdit from "./components/pages/Partners/crud/PartnersEdit";
import Register from "./components/pages/Register";
import PrivateRoute from "./routes/PirvateRoute";
import PartnersAddInvoice from "./components/pages/Partners/crud/PartnersAddInvoice";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route
						path="/partners"
						element={
							<PrivateRoute>
								<PartnersPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/partners/:id"
						element={
							<PrivateRoute>
								<PartnersOnePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/partners/:id/edit"
						element={
							<PrivateRoute>
								<PartnersEdit />
							</PrivateRoute>
						}
					/>
					<Route
						path="/partners/:id/invoice"
						element={
							<PrivateRoute>
								<PartnersAddInvoice />
							</PrivateRoute>
						}
					/>

					<Route
						path="/invoices"
						element={
							<PrivateRoute>
								<InvoicesPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/invoice/:id"
						element={
							<PrivateRoute>
								<InvoicesOnePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/invoice/:id/payment"
						element={
							<PrivateRoute>
								<InvoiceAddPayment />
							</PrivateRoute>
						}
					/>
					<Route
						path="/invoice/:id/edit"
						element={
							<PrivateRoute>
								<InvoiceEdit />
							</PrivateRoute>
						}
					/>

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
