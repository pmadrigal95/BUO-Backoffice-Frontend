/**
 * USER ROUTES
 */

const routes = [
    {
        path: '/User/Filter',
        name: 'UserFilterViewComponent',
        component: 'user/user/UserFilterViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },

    {
        path: '/User/Editor/:Id?',
        name: 'UserEditorViewComponent',
        component: 'user/user/UserEditorViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },
];

export default routes;
