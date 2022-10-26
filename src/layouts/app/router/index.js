/**
 * Views Routers
 */

import homeRoutes from '@/views/home/router';

import promotionalCodesRoutes from '@/views/promotionalCodes/router';

const routes = [
    {
        path: '/',
        redirect: '/Home',
        name: 'TheMain',
        component: 'app',
        children: [...homeRoutes, ...promotionalCodesRoutes],
    },
];

export default routes;
