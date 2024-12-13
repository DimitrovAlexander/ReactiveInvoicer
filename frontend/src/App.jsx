import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import InterviewsPage from "./components/pages/Interviews/InterviewsPage";
import EmployeesPage from "./components/pages/Employees/EmployeesPage";
import PositionsPage from "./components/pages/Positions/PositionsPage";
import Login from "./components/pages/Login";
import InterviewPage from "./components/pages/Interviews/InterviewsOnePage";
import InterviewsOnePage from "./components/pages/Interviews/InterviewsOnePage";
import EmployeesOnePage from "./components/pages/Employees/EmployeesOnePage";
import PositionsOnePage from "./components/pages/Positions/PositionsOnePage";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/employees" element={<EmployeesPage />} />
					<Route path="/employees/:id" element={<EmployeesOnePage />} />

					<Route path="/interviews" element={<InterviewsPage />} />
					<Route path="/interviews/:id" element={<InterviewsOnePage />} />

					<Route path="/positions" element={<PositionsPage />} />
					<Route path="/positions/:id" element={<PositionsOnePage />} />

					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
