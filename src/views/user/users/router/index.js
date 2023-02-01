/**
 * USER ROUTES
 */

const routes = [
    {
        path: '/User/Filter',
        name: 'UserFilterViewComponent',
        component: 'user/users/UserFilterViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },

    {
        path: '/User/Editor/:Id?',
        name: 'UserEditorViewComponent',
        component: 'user/users/UserEditorViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },

    {
        path: '/User/Test',
        name: 'TestViewComponent',
        component: 'user/users/TestViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },
];

export default routes;
