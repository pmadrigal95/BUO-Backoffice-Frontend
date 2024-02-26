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
            module: 'DepartureUsersViewComponent',
        },
    },

    {
        path: '/DepartureUsers/Editor/:Id?',
        name: 'DepartureUsersEditorViewComponent',
        component:
            'departureUsers/departureUsers/DepartureUsersEditorViewComponent',
        meta: {
            module: 'DepartureUsersViewComponent',
        },
    },
];

export default routes;
