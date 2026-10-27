import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import ProjectCasePage from "./pages/ProjectCasePage.jsx";
import CasesPage from "./pages/CasesPage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import ConsentPage from "./pages/ConsentPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ServiceOfferPage from "./pages/ServiceOfferPage.jsx";
import PharmacyPage from "./pages/PharmacyPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceOfferPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/case/adonis" element={<ProjectCasePage project="adonis" />} />
          <Route path="/case/olymp-clinic" element={<ProjectCasePage project="olympClinic" />} />
          <Route path="/case/narodnaya" element={<ProjectCasePage project="narodnaya" />} />
          <Route path="/case/olymp" element={<Navigate to="/case/olymp-clinic/" replace />} />
          <Route path="/industries/pharmacy" element={<PharmacyPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/consent" element={<ConsentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
