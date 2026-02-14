import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export const rootRoute =
createRootRoute({
    component: () => (
        <QueryClientProvider client=
        {queryClient}>
            <Outlet />
        </QueryClientProvider>
    ),
    notFoundComponent: () => <div>404 - Seite nicht gefunden</div>,
});