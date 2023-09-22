/**
 * Descripción: Configuracion de Filtros de los Grids
 *
 * @displayName baseFilterSettingsHelper
 */

import { baseFilterColumnsHelper } from '@/helpers/baseFilterColumnsHelper';

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
    userId,
    userKey = 'usuarioId',
    qualificationId,
    statusId,
    assessmentTypeId,
    assessmentId,
}) => {
    let array = [];

    if (companyId) {
        array.push({
            name: 'organizacionId',
            value: companyId,
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

    return array;
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
const promotionalCodeSetting = ({ key, singleSelect, columns }) => {
    return {
        endpoint: 'codigoPromocion/findBy',
        columns: columns,
        key: key ? key : 'id',
        singleSelect: singleSelect,
        multiSelect: !singleSelect,
    };
};

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
        userId,
        userKey,
        qualificationId,
        statusId,
        assessmentTypeId,
        assessmentId,
    }) {
        return extraParams({
            companyId,
            userId,
            userKey,
            qualificationId,
            statusId,
            assessmentTypeId,
            assessmentId,
        });
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
};

export const baseDataTableColumnsHelper = {
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
