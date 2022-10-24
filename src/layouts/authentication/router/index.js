/**
 * Authentication ROUTES
 */

import errorRoutes from '@/views/error/router';
import authenticationRoutes from '@/views/authentication/router';

const routes = [...authenticationRoutes, ...errorRoutes];

export default routes;
