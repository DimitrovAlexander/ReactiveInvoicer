import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import InterviewsPage from "./components/pages/Invoices/InvoicesPage";
import EmployeesPage from "./components/pages/Employees/EmployeesPage";
import PositionsPage from "./components/pages/Positions/PositionsPage";
import Login from "./components/pages/Login";
import InvoicesPage from "./components/pages/Invoices/InvoicesPage";
import InvoicesOnePage from "./components/pages/Invoices/InvoicesOnePage";
import EmployeesOnePage from "./components/pages/Employees/EmployeesOnePage";
import PositionsOnePage from "./components/pages/Positions/PositionsOnePage";
import InvoicesRead from "./components/pages/Invoices/crud/InvoicesRead";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/partners" element={<EmployeesPage />} />
					<Route path="/partners/:id" element={<EmployeesOnePage />} />

					<Route path="/invoices" element={<InvoicesPage />} />
					<Route path="/invoice/:id" element={<InvoicesOnePage/>} />

					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
