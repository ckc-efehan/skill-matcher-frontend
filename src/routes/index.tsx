import { createRoute, createRouter } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { authenticatedRoute } from './authenticated';
import { publicRoute } from './public';

// public
const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: () => <div>Login (TODO)</div>,
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
  component: () => <div>Dashboard (TODO)</div>,
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