/**
 * Recruitment ROUTES
 */
const routes = [
    {
        path: '/Recruitment/Filter',
        name: 'RecruitmentFilterViewComponent',
        component: 'recruitment/RecruitmentFilterViewComponent',
        meta: {
            module: 'BUODashboardViewComponent',
        },
    },

    {
        path: '/Recruitment/Editor',
        name: 'RecruitmentEditorViewComponent',
        component: 'recruitment/RecruitmentEditorViewComponent',
        meta: {
            module: 'BUODashboardViewComponent',
        },
    },

    {
        path: '/Recruitment/:Id',
        name: 'RecruitmentDashboardViewComponent',
        component: 'recruitment/RecruitmentDashboardViewComponent',
        meta: {
            module: 'BUODashboardViewComponent',
        },
    },

    {
        path: 'Buo/Dashboard/Recruitment/:Id',
        name: 'BuoRecruitmentDashboardViewComponent',
        component: 'recruitment/RecruitmentDashboardViewComponent',
        meta: {
            module: 'BUODashboardViewComponent',
        },
    },
];

export default routes;
