/**
 * Views Routers
 */

import homeRoutes from '@/views/home/router';

import promotionalCodesRoutes from '@/views/promotionalCodes/router';

import analyticsRoutes from '@/views/analytics/router';

const routes = [
    {
        path: '/',
        redirect: '/Authentication',
        name: 'TheMain',
        component: 'app',
        children: [
            ...homeRoutes,
            ...promotionalCodesRoutes,
            ...analyticsRoutes,
        ],
    },
];

export default routes;
