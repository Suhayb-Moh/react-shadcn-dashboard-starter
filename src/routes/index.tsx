import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './protected-route';
import AuthRoute from './auth-route';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

// ----------------------------------------------------------------------

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        element: <DashboardPage />,
        index: true
      },
      {
        path: 'employee',
        element: <StudentPage />
      },
      {
        path: 'student/details',
        element: <StudentDetailPage />
      },
      {
        path: 'form',
        element: <FormPage />
      }
    ]
  }
];

const authRoutes = [
  {
    path: '/auth',
    element: (
      <AuthRoute>
        <Suspense>
          <Outlet />
        </Suspense>
      </AuthRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />,
        index: true
      },
      {
        path: 'login',
        element: <SignInPage />
      },
      {
        path: 'signup',
        element: <StudentPage />
      }
    ]
  }
];

const publicRoutes = [
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];

export const routes = createBrowserRouter([
  ...dashboardRoutes,
  ...authRoutes,
  ...publicRoutes
]);
