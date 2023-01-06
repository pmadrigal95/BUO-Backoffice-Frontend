/**
 * Customer SignUp ROUTES
 */
const routes = [
    {
        path: '/ResetPassword/:token?',
        name: 'ResetPasswordViewComponent',
        component: 'authentication/resetPassword/ResetPasswordViewComponent',
        meta: {
            module: 'ResetPasswordViewComponent',
        },
    },
];

export default routes;
