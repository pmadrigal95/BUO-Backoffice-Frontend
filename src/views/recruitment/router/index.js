/**
 * Recruitment ROUTES
 */
const routes = [
    {
        path: '/Recruitment/Filter',
        name: 'RecruitmentFilterViewComponent',
        component: 'recruitment/RecruitmentFilterViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },

    {
        path: '/Recruitment/Editor',
        name: 'RecruitmentEditorViewComponent',
        component: 'recruitment/RecruitmentEditorViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },

    {
        path: '/Recruitment/Dashboard/:Id',
        name: 'RecruitmentDashboardViewComponent',
        component: 'recruitment/RecruitmentDashboardViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
