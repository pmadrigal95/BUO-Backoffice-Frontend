/**
 * Users ROUTES
 */
const routes = [
    {
        path: '/Analytics/Users/Created',
        name: 'AnalyticsUserCreatedViewComponent',
        component: 'analytics/users/AnalyticsUserCreatedViewComponent',
        meta: {
            module: 'AnalyticsUserCreatedViewComponent',
        },
    },

    {
        path: '/Analytics/Users/Accumulated',
        name: 'AnalyticsUserAccumulatedViewComponent',
        component: 'analytics/users/AnalyticsUserAccumulatedViewComponent',
        meta: {
            module: 'AnalyticsUserAccumulatedViewComponent',
        },
    },
];

export default routes;
