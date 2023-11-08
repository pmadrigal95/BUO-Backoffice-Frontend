/**
 * SECURITY ROUTES
 */
const routes = [
    {
        path: '/Security/Filter',
        name: 'SecurityFilterViewComponent',
        component: 'security/SecurityFilterViewComponent',
        meta: {
            module: 'SecurityViewComponent',
        },
    },

    {
        path: '/Security/Editor',
        name: 'SecurityEditorViewComponent',
        component: 'security/SecurityEditorViewComponent',
        meta: {
            module: 'SecurityViewComponent',
        },
    },

    {
        path: '/Security/:Id',
        name: 'SecurityDashboardViewComponent',
        component: 'security/SecurityDashboardViewComponent',
        meta: {
            module: 'SecurityViewComponent',
        },
    },
];

export default routes;
