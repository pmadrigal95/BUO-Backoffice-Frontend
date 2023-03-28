/**
 * USER ROUTES
 */

import userRoutes from '@/views/user/user/router';

import profileRoutes from '@/views/user/profile/router';

import bulkLoadRoutes from '@/views/user/bulkLoad/router';

import certificationRoutes from '@/views/user/certification/router';

const routes = [
    ...userRoutes,
    ...profileRoutes,
    ...bulkLoadRoutes,
    ...certificationRoutes,
];

export default routes;
