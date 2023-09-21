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
