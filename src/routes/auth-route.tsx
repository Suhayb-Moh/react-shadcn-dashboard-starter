import { useAuthStore } from '@/hooks/use-auth-store';
import { usePathname, useRouter } from '@/routes/hooks';
import { useEffect } from 'react';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuth } = useAuthStore();
  const pathname = usePathname();

  console.log('pathname', pathname);

  useEffect(() => {
    if (isAuth) {
      router.back();
    }
  }, [isAuth, router]);

  return !isAuth ? children : null;
}
