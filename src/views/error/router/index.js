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
            module: 'NotFoundViewComponent',
        },
    },
    {
        path: '/403',
        name: '403',
        component: 'error/NetworkIssueViewComponent',
        meta: {
            module: 'NetworkIssueViewComponent',
        },
    },
    {
        path: '*',
        redirect: { name: '404' },
    },
    { path: '*', component: 'error/NotFoundViewComponent' },
];

export default routes;
