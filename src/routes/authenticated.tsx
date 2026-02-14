import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { useAuthStore } from '@/stores/auth-store';

export const authenticatedRoute = createRoute({
    id: '_authenticated',
    getParentRoute: () => rootRoute,
    beforeLoad: ({ location }) => {
      const { accessToken } = useAuthStore.getState();
      if (!accessToken) {
        throw redirect({
          to: '/login',
          search: { redirect: location.href },
        });
      }
    },
    component: () => (
      <Outlet />
    ),
  });