/**
 * Authentication ROUTES
 */

import loginRoutes from '@/views/authentication/login/router';

import resetPasswordRoutes from '@/views/authentication/resetPassword/router';

const routes = [...loginRoutes, ...resetPasswordRoutes];

export default routes;
