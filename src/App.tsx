import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

// Lazy loading pages for better performance
const DashboardHome = lazy(() => import('./pages/DashboardHome'));
const TransactionsPage = lazy(() => import('./pages/Transactions'));
const Members = lazy(() => import('./pages/Members'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Loading component
const PageLoader = () => (
  <div className="w-full h-full flex items-center justify-center p-20">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        } />
        <Route path="/register" element={
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        } />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <DashboardHome />
            </Suspense>
          } />
          <Route path="transactions" element={
            <Suspense fallback={<PageLoader />}>
              <TransactionsPage />
            </Suspense>
          } />
          <Route path="members" element={
            <Suspense fallback={<PageLoader />}>
              <Members />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<PageLoader />}>
              <Settings />
            </Suspense>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
