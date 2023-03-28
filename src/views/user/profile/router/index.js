/**
 * PROFILES ROUTES
 */

const routes = [
    {
        path: '/Profile/Filter',
        name: 'ProfileFilterViewComponent',
        component: 'user/profile/ProfileFilterViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },

    {
        path: '/Profile/Details/:Id',
        name: 'ProfileDetailsViewComponent',
        component: 'user/profile/ProfileDetailsViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },
];

export default routes;
