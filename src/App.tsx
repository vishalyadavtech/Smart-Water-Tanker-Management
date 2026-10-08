import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';

// Layouts
import MainLayout from './components/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/Dashboard';
import BookTanker from './pages/user/BookTanker';
import LiveTracking from './pages/user/LiveTracking';
import VendorDashboard from './pages/vendor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

// Mock components for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-16 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center max-w-2xl mx-auto mt-10">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-primary/5 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8"
    >
      <Droplets className="text-primary" size={48} />
    </motion.div>
    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">{title}</h2>
    <p className="text-slate-500 text-lg font-medium leading-relaxed">This feature is currently being polished for the production build. Check back soon for a premium experience.</p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.history.back()}
      className="mt-10 bg-slate-900 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-slate-900/20 text-sm uppercase tracking-widest"
    >
      Go Back
    </motion.button>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
};

const RoleBasedDashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'vendor') return <VendorDashboard />;
  return <UserDashboard />;
};

import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              {/* Common Dashboard Route */}
              <Route index element={<RoleBasedDashboard />} />
              
              {/* User Specific Routes */}
              <Route path="book" element={<ProtectedRoute roles={['user']}><BookTanker /></ProtectedRoute>} />
              <Route path="track/:id" element={<ProtectedRoute roles={['user']}><LiveTracking /></ProtectedRoute>} />
              <Route path="history" element={<ProtectedRoute roles={['user']}><Placeholder title="Booking History" /></ProtectedRoute>} />
              
              {/* Vendor Specific Routes */}
              <Route path="earnings" element={<ProtectedRoute roles={['vendor']}><Placeholder title="Earnings Dashboard" /></ProtectedRoute>} />

              {/* Admin Specific Routes */}
              <Route path="live-map" element={<ProtectedRoute roles={['admin']}><Placeholder title="Live Fleet Map" /></ProtectedRoute>} />
              <Route path="bookings" element={<ProtectedRoute roles={['admin']}><Placeholder title="All Bookings" /></ProtectedRoute>} />
              <Route path="vendors" element={<ProtectedRoute roles={['admin']}><Placeholder title="Vendor Management" /></ProtectedRoute>} />
              <Route path="analytics" element={<ProtectedRoute roles={['admin']}><Placeholder title="System Analytics" /></ProtectedRoute>} />
              
              {/* Common Shared Routes */}
              <Route path="notifications" element={<Placeholder title="Notifications" />} />
              <Route path="settings" element={<Placeholder title="Settings" />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
