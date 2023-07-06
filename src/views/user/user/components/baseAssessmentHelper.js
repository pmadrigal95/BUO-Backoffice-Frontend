/**
 * Descripción: Configuracion Assessments
 *
 * @displayName baseAssessmentHelper
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const buoId = 1;

const validateSameCompany = (userList) => {
    const array = userList.filter(
        (element) => element.organizacionId != userList[0].organizacionId
    );

    return array.length === 0;
};

const setEntity = (userList) => {
    if (validateSameCompany(userList)) {
        return {
            isMultiple: false,
            companyId: userList[0].organizacionId,
            list: userList.map((element) => {
                return {
                    userId: element.id,
                    name: element.nombreCompleto,
                    companyId: element.organizacionId,
                };
            }),
        };
    } else {
        baseNotificationsHelper.Message(true, baseLocalHelper.$_MsgErrorAction);
    }
};

const setAssessment = ({ getRow }) => {
    const userList = getRow();

    switch (true) {
        case userList.length == 0:
            baseNotificationsHelper.Message(
                true,
                baseLocalHelper.$_MsgRowNotSelected
            );
            break;

        case userList.length > 0:
            return setEntity(userList);
    }
};

const setAssessments = ({ UserCompanyId, filterCompanyId }) => {
    if (UserCompanyId === buoId && !filterCompanyId) {
        baseNotificationsHelper.Message(true, baseLocalHelper.$_MsgErrorAction);
        return;
    }

    return {
        isMultiple: true,
        companyId: baseFilterSettingsHelper.$_getCompanyId({
            userCompanyId: UserCompanyId,
            companyId: filterCompanyId,
        }),
    };
};

export const baseAssessmentHelper = {
    $_setAssessmentByType({ type, getRow, UserCompanyId, filterCompanyId }) {
        return type
            ? setAssessment({ getRow })
            : setAssessments({ UserCompanyId, filterCompanyId });
    },
};
