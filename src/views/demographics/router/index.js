/**
 * USER ROUTES
 */

import assessmentsRoutes from '@/views/demographics/assessments/router';

import pdaRoutes from '@/views/demographics/pda/router';

const routes = [...assessmentsRoutes, ...pdaRoutes];

export default routes;
