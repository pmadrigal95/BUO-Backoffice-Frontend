/**
 * ERRORS ROUTES
 */
const routes = [
    //ERROR
    {
        path: '/404',
        name: '404',
        component: 'error/NotFoundViewComponent',
        meta: {
            module: 'Error',
        },
    },
    {
        path: '/403',
        name: 'Network-issue',
        component: 'error/NetworkIssueViewComponent',
        meta: {
            module: 'Error',
        },
    },
    {
        path: '*',
        redirect: { name: '404' },
    },
    { path: '*', component: 'error/NotFoundViewComponent' },
];

export default routes;
