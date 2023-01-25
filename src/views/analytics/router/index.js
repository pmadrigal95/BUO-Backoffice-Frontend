/**
 * ANALYTICS ROUTES
 */

import indicatorsRoutes from '@/views/analytics/indicators/router';

import usersRoutes from '@/views/analytics/users/router';

const routes = [...indicatorsRoutes, ...usersRoutes];

export default routes;
