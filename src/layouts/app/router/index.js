/**
 * Views Routers
 */

import homeRoutes from '@/views/home/router';

import companyRoutes from '@/views/company/router';

import analyticsRoutes from '@/views/analytics/router';

import departmentRoutes from '@/views/department/router';

import promotionalCodesRoutes from '@/views/promotionalCodes/router';

const routes = [
    {
        path: '/',
        redirect: '/Authentication',
        name: 'TheMain',
        component: 'app',
        children: [
            ...homeRoutes,
            ...companyRoutes,
            ...analyticsRoutes,
            ...departmentRoutes,
            ...promotionalCodesRoutes,
        ],
    },
];

export default routes;
