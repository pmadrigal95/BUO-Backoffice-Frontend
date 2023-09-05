/**
 * USER ROUTES
 */

import assignmentRoutes from '@/views/setIndicator/assignment/router';

import evaluationRoutes from '@/views/setIndicator/evaluation/router';

const routes = [...assignmentRoutes, ...evaluationRoutes];

export default routes;
