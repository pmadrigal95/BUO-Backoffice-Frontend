/**
 * category CODES ROUTES
 */
const routes = [
    {
        path: '/Category/Filter',
        name: 'CategoryFilterViewComponent',
        component: 'category/CategoryFilterViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },

    {
        path: '/Category/Editor/:Id?',
        name: 'CategoryEditorViewComponent',
        component: 'category/CategoryEditorViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },
];

export default routes;
