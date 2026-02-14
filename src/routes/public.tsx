import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { useAuthStore } from '@/stores/auth-store';

export const publicRoute = createRoute({
  id: '_public',
  getParentRoute: () => rootRoute,
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      throw redirect({ to: '/' });
    }
  },
  component: () => (
    <Outlet />
  ),
});