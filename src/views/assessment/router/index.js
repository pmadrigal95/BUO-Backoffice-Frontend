/**
 * Type Assesments CODES ROUTES
 */
const routes = [
    {
        path: '/Assessments/Filter',
        name: 'AssessmentFilterViewComponent',
        component: 'assessment/AssessmentFilterViewComponent',
        meta: {
            module: 'AssessmentViewComponent',
        },
    },

    {
        path: '/Assessments/Editor',
        name: 'AssessmentEditorViewComponent',
        component: 'assessment/AssessmentEditorViewComponent',
        meta: {
            module: 'AssessmentViewComponent',
        },
    },

    {
        path: '/Assessment/:Id',
        name: 'AssessmentReviewViewComponent',
        component: 'assessment/AssessmentReviewViewComponent',
        meta: {
            module: 'AssessmentViewComponent',
        },
    },
];

export default routes;
