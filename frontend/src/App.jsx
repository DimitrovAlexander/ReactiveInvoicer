import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import InterviewsPage from "./components/pages/Invoices/InvoicesPage";
import PartnersPage from "./components/pages/Partners/PartnersPage";
import PositionsPage from "./components/pages/Positions/PositionsPage";
import Login from "./components/pages/Login";
import InvoicesPage from "./components/pages/Invoices/InvoicesPage";
import InvoicesOnePage from "./components/pages/Invoices/InvoicesOnePage";
import PartnersOnePage from "./components/pages/Partners/PartnersOnePage";
import PositionsOnePage from "./components/pages/Positions/PositionsOnePage";
import InvoicesRead from "./components/pages/Invoices/crud/InvoicesRead";
import InvoiceAddPayment from "./components/pages/Invoices/crud/InvoiceAddPayment";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/partners" element={<PartnersPage />} />
					{/* <Route path="/partners/:id" element={<PartnersOnePage />} /> */}

					<Route path="/invoices" element={<InvoicesPage />} />
					<Route path="/invoice/:id" element={<InvoicesOnePage/>} />
					<Route path="/invoice/:id/payment" element={<InvoiceAddPayment/>} />

					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
