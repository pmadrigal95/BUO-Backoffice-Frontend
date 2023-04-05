/**
 * Description: Functions needed to create the object for the chart graph.
 * Font: https://www.chartjs.org/docs/latest/getting-started/usage.html
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const createLabels = (abilities) => {
    return abilities.map((element) => element.habilidadUI);
};

const createData = (abilities) => {
    return abilities.map((element) => element.porcentajeNaturalHabilidad);
};

const createDatasets = (abilitiesList) => {
    return abilitiesList
        .filter((element) => element.habilidadPDADTOSet != null)
        .map((element, key) => {
            return {
                borderColor: setBorderColor(key),
                label: element.nombreEmpleado,
                data: createData(element.habilidadPDADTOSet),
            };
        });
};

const createObject = (pdaList) => {
    const pdaLabels = pdaList.find(
        (element) => element.habilidadPDADTOSet != null
    );

    const chartData = {
        labels:
            pdaLabels != undefined
                ? createLabels(pdaLabels.habilidadPDADTOSet)
                : null,
        datasets: createDatasets(pdaList),
    };
    return chartData;
};

const setBorderColor = (index) => {
    const color = baseDataVisualizationColorsHelper.$_getColor(index);
    const borderColor = color.main;
    return borderColor;
};

/**
 * Description: functions used for chart
 */
export default {
    $_createLabels(abilities) {
        return createLabels(abilities);
    },

    $_createData(abilities) {
        return createData(abilities);
    },

    $_setBorderColor(abilities) {
        return setBorderColor(abilities);
    },

    $_createDatasets(abilities) {
        return createDatasets(abilities);
    },

    $_createObject(abilities) {
        return createObject(abilities);
    },
};
