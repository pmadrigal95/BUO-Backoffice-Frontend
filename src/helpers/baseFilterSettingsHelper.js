/**
 * Descripción: Configuracion de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
 */

import { baseFilterColumnsHelper } from '@/helpers/baseFilterColumnsHelper';

/**
 * Configuraciones
 */

/**
 * Organizacion BUO
 */
const buoId = 1;

const fnIsBuoUser = (companyId) => {
    return companyId === buoId;
};

/**
 * Get companyId
 */
const getCompanyId = ({ userCompanyId, companyId, filterCompanyId }) => {
    if (userCompanyId !== buoId && !companyId) {
        return userCompanyId;
    }

    if (companyId) {
        return companyId;
    } else if (filterCompanyId) {
        return filterCompanyId;
    }
};

/**
 * Configuracion extraParams
 */
const extraParams = ({
    companyId,
    departmentId,
    userId,
    userKey = 'usuarioId',
    qualificationId,
    statusId,
    assessmentTypeId,
    assessmentId,
    date,
    vacancyId,
}) => {
    let array = [];

    if (companyId) {
        array.push({
            name: 'organizacionId',
            value: companyId,
        });
    }

    if (departmentId) {
        array.push({
            name: 'departamentoId',
            value: departmentId,
        });
    }

    if (qualificationId) {
        array.push({
            name: 'cualificacionId',
            value: qualificationId,
        });
    }

    if (statusId) {
        array.push({
            name: 'estadoId',
            value: statusId,
        });
    }

    if (userId) {
        array.push({
            name: userKey,
            value: userId,
        });
    }

    if (assessmentTypeId) {
        array.push({
            name: 'tipoPruebaId',
            value: assessmentTypeId,
        });
    }

    if (assessmentId) {
        array.push({
            name: 'pruebaId',
            value: assessmentId,
        });
    }

    if (date) {
        array.push({
            name: 'fecha',
            value: date,
        });
    }

    if (vacancyId) {
        array.push({
            name: 'vacanteId',
            value: vacancyId,
        });
    }

    return array;
};

/**
 * FILTROS
 */

/**
 * Configuracion BaseServerDataTable
 */
const userSetting = ({ key, departmentId, singleSelect, columns }) => {
    return {
        endpoint: departmentId
            ? `user/findByDeep/${departmentId}`
            : 'user/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const companySetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'organizacion/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const abilitySetting = ({ key, categoryId, singleSelect, method, columns }) => {
    const finalApi = method
        ? method
        : categoryId
        ? `cualificacion/findByDeep/${categoryId}`
        : 'cualificacion/findBy';

    return {
        endpoint: finalApi,
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const microAbilitySetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'competencia/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycAbilitySetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `ability/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycMicroAbilitySetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `abilityDetails/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycTalentSetting = ({ departmentId, singleSelect }) => {
    return {
        endpoint: `talent/findBy/${departmentId ? departmentId : '0'}`,
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const approvalSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'empleadoCompetencia/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const categorySetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'categoria/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const departmentSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'departamento/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const assessmentTypeSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'tipoPrueba/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const departureUsersSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'salidaUsuario/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const departureReasonTypeSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'tipoRazonSalida/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const assessmentSetting = ({
    apiEndpoint = 'findByDeep',
    key,
    assessmentTypeId,
    singleSelect,
    columns,
}) => {
    return {
        endpoint: assessmentTypeId
            ? `prueba/${apiEndpoint}/${assessmentTypeId}`
            : 'prueba/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const userAssessmentSetting = ({
    key,
    departmentId,
    singleSelect,
    columns,
}) => {
    return {
        endpoint: departmentId
            ? `usuarioPrueba/findByDeep/${departmentId}`
            : 'usuarioPrueba/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const securitySetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'perfil/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const securityActionSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'perfil/getAcciones',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const securityActionPerRoleSetting = ({
    key,
    perfilId,
    singleSelect,
    columns,
}) => {
    return {
        endpoint: `perfil/${perfilId}/getAcciones`,
        columns: columns,
        key: key ? key : 'accionId',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const securityUserPerRoleSetting = ({
    key,
    perfilId,
    singleSelect,
    columns,
}) => {
    return {
        endpoint: `perfil/${perfilId}/getUsuarios`,
        columns: columns,
        key: key ? key : 'usuarioId',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const promotionalCodeSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'codigoPromocion/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

/**
 * Configuracion BaseServerDataTable
 */
const dinamycRecruitmentVacantSetting = ({ singleSelect }) => {
    return {
        endpoint: 'dashboard/reclutamiento/vacante/candidatos',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
        dynamic: true,
    };
};

/**
 * Exports
 */

export const baseFilterSettingsHelper = {
    /**
     * Configuracion companyId
     */
    $_getCompanyId({ userCompanyId, companyId, filterCompanyId }) {
        return getCompanyId({ userCompanyId, companyId, filterCompanyId });
    },

    /**
     * Configuracion extraParams
     */
    $_setExtraParams({
        companyId,
        departmentId,
        userId,
        userKey,
        qualificationId,
        statusId,
        assessmentTypeId,
        assessmentId,
        date,
        vacancyId,
    }) {
        return extraParams({
            companyId,
            departmentId,
            userId,
            userKey,
            qualificationId,
            statusId,
            assessmentTypeId,
            assessmentId,
            date,
            vacancyId,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserSetting({
        key,
        companyId,
        departmentId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setUserColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
                  departmentId,
              });

        return userSetting({
            key,
            departmentId,
            singleSelect,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCompanySetting({ key, singleSelect, isFilter, list, pageView }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setCompanyColumns({
                  isFilter,
                  pageView,
              });

        return companySetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAbilitySetting({
        key,
        companyId,
        categoryId,
        singleSelect,
        method,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const show = method ? true : isFilter ? false : fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setAbilityColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
                  show,
              });

        return abilitySetting({
            key,
            categoryId,
            singleSelect,
            method,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setMicroAbilitySetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setMicroAbilityColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return microAbilitySetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycAbilitySetting({ departmentId, singleSelect }) {
        return dinamycAbilitySetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycMicroAbilitySetting({ departmentId, singleSelect }) {
        return dinamycMicroAbilitySetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycTalentSetting({ departmentId, singleSelect }) {
        return dinamycTalentSetting({ departmentId, singleSelect });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setApprovalSetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setApprovalColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return approvalSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCategorySetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setCategoryColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return categorySetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartmentSetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setDepartmentColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return departmentSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentTypeSetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setAssessmentTypeColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return assessmentTypeSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureUsersSetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setDepartureUsersColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return departureUsersSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureReasonTypeSetting({
        key,
        companyId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setDepartureReasonTypeColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return departureReasonTypeSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentSetting({
        apiEndpoint,
        key,
        companyId,
        assessmentTypeId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setAssessmentColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
              });

        return assessmentSetting({
            apiEndpoint,
            key,
            assessmentTypeId,
            singleSelect,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserAssessmentSetting({
        key,
        companyId,
        departmentId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setUserAssessmentColumns({
                  isFilter,
                  pageView,
                  isBuoUser,
                  departmentId,
              });

        return userAssessmentSetting({
            key,
            departmentId,
            singleSelect,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecuritySetting({ key, singleSelect, isFilter, list, pageView }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setSecurityColumns({
                  isFilter,
                  pageView,
              });

        return securitySetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionSetting({
        key,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setSecurityActionsColumns({
                  isFilter,
                  pageView,
              });

        return securityActionSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionPerRoleSetting({
        key,
        perfilId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setSecurityActionsPerRoleColumns({
                  isFilter,
                  pageView,
              });

        return securityActionPerRoleSetting({
            key,
            perfilId,
            singleSelect,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityUserPerRoleSetting({
        key,
        perfilId,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setSecurityUsersPerRoleColumns({
                  isFilter,
                  pageView,
              });

        return securityUserPerRoleSetting({
            key,
            perfilId,
            singleSelect,
            columns,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setPromotionalCodeSetting({
        key,
        singleSelect,
        isFilter,
        list,
        pageView,
    }) {
        const columns = list
            ? list
            : baseFilterColumnsHelper.$_setPromotionalCodeColumns({
                  isFilter,
                  pageView,
              });

        return promotionalCodeSetting({ key, singleSelect, columns });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDinamycRecruitmentVacantSetting({ singleSelect }) {
        return dinamycRecruitmentVacantSetting({ singleSelect });
    },
};

export const baseDataTableColumnsHelper = {
    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserColumns({ isFilter, pageView, companyId, departmentId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setUserColumns({
            isFilter,
            pageView,
            isBuoUser,
            departmentId,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCompanyColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setCompanyColumns({
            isFilter,
            pageView,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAbilityColumns({ method, isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);

        const show = method ? true : isFilter ? false : isBuoUser;
        return baseFilterColumnsHelper.$_setAbilityColumns({
            isFilter,
            pageView,
            isBuoUser,
            show,
        });
    },

    $_setMicroAbilityColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setMicroAbilityColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setApprovalColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setApprovalColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setCategoryColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setCategoryColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartmentColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setDepartmentColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentTypeColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setAssessmentTypeColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureUsersColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setDepartureUsersColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setDepartureReasonTypeColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setDepartureReasonTypeColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setAssessmentColumns({ isFilter, pageView, companyId }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setAssessmentColumns({
            isFilter,
            pageView,
            isBuoUser,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setUserAssessmentColumns({
        isFilter,
        pageView,
        companyId,
        departmentId,
    }) {
        const isBuoUser = fnIsBuoUser(companyId);
        return baseFilterColumnsHelper.$_setUserAssessmentColumns({
            isFilter,
            pageView,
            isBuoUser,
            departmentId,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setSecurityColumns({
            isFilter,
            pageView,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionsColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setSecurityActionsColumns({
            isFilter,
            pageView,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityActionsPerRoleColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setSecurityActionsPerRoleColumns({
            isFilter,
            pageView,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setSecurityUsersPerRoleColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setSecurityUsersPerRoleColumns({
            isFilter,
            pageView,
        });
    },

    /**
     * Configuracion BaseServerDataTable
     */
    $_setPromotionalCodeColumns({ isFilter, pageView }) {
        return baseFilterColumnsHelper.$_setPromotionalCodeColumns({
            isFilter,
            pageView,
        });
    },
};
