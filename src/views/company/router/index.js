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

    {
        path: '/Company/Dashboard/:Id',
        name: 'CompanyDashboardViewComponent',
        component: 'company/CompanyDashboardViewComponent',
        meta: {
            module: 'CompanyViewComponent',
        },
    },
];

export default routes;
