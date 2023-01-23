/**
 * USER ROUTES
 */
const routes = [
    {
        path: '/User/Filter',
        name: 'UserFilterViewComponent',
        component: 'user/UserFilterViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },

    {
        path: '/User/Editor/:Id?',
        name: 'UserEditorViewComponent',
        component: 'user/UserEditorViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },
    {
        path: '/User/Test',
        name: 'TestViewComponent',
        component: 'user/UserEditorViewComponent',
        meta: {
            module: 'UserViewComponent',
        },
    },
];

export default routes;