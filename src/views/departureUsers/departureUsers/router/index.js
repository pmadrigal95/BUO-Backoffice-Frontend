/**
 * Departure Users CODES ROUTES
 */
const routes = [
    {
        path: '/DepartureUsers/Filter',
        name: 'DepartureUsersFilterViewComponent',
        component:
            'departureUsers/departureUsers/DepartureUsersFilterViewComponent',
        meta: {
            module: 'AssessmentTypeViewComponent',
        },
    },

    {
        path: '/DepartureUsers/Editor/:Id?',
        name: 'DepartureUsersEditorViewComponent',
        component:
            'departureUsers/departureUsers/DepartureUsersEditorViewComponent',
        meta: {
            module: 'AssessmentTypeViewComponent',
        },
    },
];

export default routes;
