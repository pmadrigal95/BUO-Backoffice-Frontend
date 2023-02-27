/**
 * BUO PDA REPORT ROUTES
 */
const routes = [
    {
        path: '/Reports/BUO-PDA',
        name: 'BUOPDAReportViewComponent',
        component: 'reports/buo-pda/BUOPDAReportViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
    {
        path: '/Reports/BUO-PDA/User/:Id',
        name: 'BUOPDAUserDetailsReportViewComponent',
        component: 'reports/buo-pda/BUOPDAUserDetailsReportViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
