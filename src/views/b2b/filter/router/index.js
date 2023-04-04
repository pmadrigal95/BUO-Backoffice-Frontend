/**
 * ROUTES
 */

import searchPeopleByAbilityRoutes from '@/views/b2b/filter/searchPeopleByAbility/router';

import searchAbilitiesByDepartmentOrPersonRoutes from '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/router';

const routes = [
    ...searchPeopleByAbilityRoutes,
    ...searchAbilitiesByDepartmentOrPersonRoutes,
];

export default routes;
