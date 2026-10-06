import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import CasePage from "./pages/CasePage.jsx";
import CasesPage from "./pages/CasesPage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/case/energo" element={<CasePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
