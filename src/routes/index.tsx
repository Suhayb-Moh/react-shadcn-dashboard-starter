import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AuthRoute from './auth-route';
import ProtectedRoute from './protected-route';

// Lazy loaded components
const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { element: <DashboardPage />, index: true },
      { path: 'employee', element: <StudentPage /> },
      { path: 'student/details', element: <StudentDetailPage /> },
      { path: 'form', element: <FormPage /> }
    ]
  }
];

const authRoutes = [
  {
    path: '/auth',
    element: (
      <AuthRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </AuthRoute>
    ),
    children: [
      { path: '', element: <Navigate to="/auth/login" replace />, index: true },
      { path: 'login', element: <SignInPage /> },
      { path: 'signup', element: <StudentPage /> }
    ]
  }
];

const publicRoutes = [
  { path: '/', element: <Navigate to="/auth/login" replace /> },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate to="/404" replace /> }
];

// Combine all routes
export const routes = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...dashboardRoutes
]);
