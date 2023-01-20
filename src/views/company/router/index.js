/**
 * COMPANY ROUTES
 */
const routes = [
    {
        path: '/Company/Filter',
        name: 'CompanyFilterViewComponent',
        component: 'company/CompanyFilterViewComponent',
        meta: {
            module: 'CompanyViewComponent',
        },
    },

    {
        path: '/Company/Editor/:Id?',
        name: 'CompanyEditorViewComponent',
        component: 'company/CompanyEditorViewComponent',
        meta: {
            module: 'CompanyViewComponent',
        },
    },
];

export default routes;
