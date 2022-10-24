/**
 * Views Routers
 */

import homeRoutes from '@/views/home/router';

const routes = [
    {
        path: '/',
        redirect: '/Home',
        name: 'TheMain',
        component: 'app',
        children: [...homeRoutes],
    },
];

export default routes;
