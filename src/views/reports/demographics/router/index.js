/**
 * USER ROUTES
 */

import assessmentsRoutes from '@/views/reports/demographics/assessments/router';

import pdaRoutes from '@/views/reports/demographics/pda/router';

const routes = [...assessmentsRoutes, ...pdaRoutes];

export default routes;
