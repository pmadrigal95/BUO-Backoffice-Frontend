/**
 * ROUTES
 */

import buoDashboardRoutes from '@/views/dashboard/buoDashboard/router';

import sandboxRoutes from '@/views/sandbox/router';

const routes = [...buoDashboardRoutes, ...sandboxRoutes];

export default routes;
