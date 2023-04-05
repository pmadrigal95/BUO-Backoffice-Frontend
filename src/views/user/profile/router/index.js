/**
 * PROFILES ROUTES
 */

const routes = [
    {
        path: '/Profile/Filter',
        name: 'ProfileFilterViewComponent',
        component: 'user/profile/ProfileFilterViewComponent',
        meta: {
            module: 'ProfileViewComponent',
        },
    },

    {
        path: '/Profile/Details/:Id',
        name: 'ProfileDetailsViewComponent',
        component: 'user/profile/ProfileDetailsViewComponent',
        meta: {
            module: 'ProfileViewComponent',
        },
    },
];

export default routes;
