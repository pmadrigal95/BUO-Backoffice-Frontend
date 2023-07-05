/**
 * Assessments ROUTES
 */

import assessmentTypeRoutes from '@/views/assessment/assessmentType/router';
import assessmentRoutes from '@/views/assessment/assessment/router';

const routes = [...assessmentTypeRoutes, ...assessmentRoutes];

export default routes;
