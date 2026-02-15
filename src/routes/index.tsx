import { createRoute, createRouter, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { authenticatedRoute } from './authenticated';
import { publicRoute } from './public';
import { LoginPage } from '@/features/auth/components/login-page';
import { useAuthStore } from '@/stores/auth-store';

// public
const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: LoginPage,
});

const invitationAcceptRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/invitations/accept',
  component: () => <div>Invitation Accept (TODO)</div>,
});

const passwordResetRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/password-reset',
  component: () => <div>Password Reset Request (TODO)</div>,
});

const passwordResetConfirmRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/password-reset/confirm',
  component: () => <div>Password Reset Confirm (TODO)</div>,
});

// authenticated
const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/',
  component: function Dashboard() {
    const navigate = useNavigate()
    const logout = useAuthStore((s) => s.logout)
    return (
      <div className="p-8">
        <h1>Dashboard (TODO)</h1>
        <button
          onClick={() => { logout(); navigate({ to: '/login' }) }}
          className="mt-4 rounded bg-black px-4 py-2 text-white"
        >
          Abmelden
        </button>
      </div>
    )
  },
});

const skillsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/skills',
  component: () => <div>Skills (TODO)</div>,
});

const availabilityRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/availability',
  component: () => <div>Availability (TODO)</div>,
});

const projectsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/projects',
  component: () => <div>Projects (TODO)</div>,
});

const projectDetailRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/projects/$projectId',
  component: () => <div>Project Detail (TODO)</div>,
});

const matchingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/matching',
  component: () => <div>Matching (TODO)</div>,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/users',
  component: () => <div>Admin Users (TODO)</div>,
});

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    loginRoute,
    invitationAcceptRoute,
    passwordResetRoute,
    passwordResetConfirmRoute,
  ]),
  authenticatedRoute.addChildren([
    dashboardRoute,
    skillsRoute,
    availabilityRoute,
    projectsRoute,
    projectDetailRoute,
    matchingRoute,
    adminUsersRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}