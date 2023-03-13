/**
 * BUO PDA REPORT ROUTES
 */
const routes = [
    {
        path: '/Reports/BUO-PDA',
        name: 'BUOPDAReportViewComponent',
        component: 'reports/buo-pda/BUOPDAReportViewComponent',
        meta: {
            module: 'BUOPDAReportViewComponent',
        },
    },
    {
        path: '/Reports/BUO-PDA/User/:Id',
        name: 'BUOPDAUserDetailsReportViewComponent',
        component: 'reports/buo-pda/BUOPDAUserDetailsReportViewComponent',
        meta: {
            module: 'BUOPDAReportViewComponent',
        },
    },
];

export default routes;
