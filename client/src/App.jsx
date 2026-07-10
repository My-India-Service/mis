import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ContactUs from './pages/ContactUs';
import CancellationRefund from './pages/CancellationRefund';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Events from './pages/Events';
import { BookCall, ProjectInquiry } from './pages/FormPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import TawkChat from './components/TawkChat';

function App() {
  return (
    <>
      <TawkChat />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/refund" element={<CancellationRefund />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetail />} />
      <Route path="/events" element={<Events />} />
      <Route path="/book-call" element={<BookCall />} />
      <Route path="/project-inquiry" element={<ProjectInquiry />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;
