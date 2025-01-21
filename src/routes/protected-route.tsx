import { useAuthStore } from '@/hooks/use-auth-store';
import { useEffect } from 'react';
import { useRouter } from './hooks';

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuth } = useAuthStore();
  console.log('isAuth', isAuth);

  useEffect(() => {
    if (!isAuth) {
      router.replace('/auth');
    }
  }, [isAuth, router]);

  return isAuth ? children : null;
}
