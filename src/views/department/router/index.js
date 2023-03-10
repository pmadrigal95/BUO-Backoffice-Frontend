/**
 * COMPANY ROUTES
 */
const routes = [
    {
        path: '/Department/Filter',
        name: 'DepartmentFilterViewComponent',
        component: 'department/DepartmentFilterViewComponent',
        meta: {
            module: 'DepartmentViewComponent',
        },
    },

    {
        path: '/Department/Editor/:Id?',
        name: 'DepartmentEditorViewComponent',
        component: 'department/DepartmentEditorViewComponent',
        meta: {
            module: 'DepartmentViewComponent',
        },
    },

    {
        path: '/dummy',
        name: 'dummy',
        component: 'dummy/dummy',
        meta: {
            module: 'DepartmentViewComponent',
        },
    },
];

export default routes;
