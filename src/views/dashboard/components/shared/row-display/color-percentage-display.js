/**
 * Descripción: Configuraciones Generales display porcentajes colores
 *
 * @displayName color-percentage-display.js
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const setColor = (percentage) => {
    switch (true) {
        case percentage == 100:
            return 'greenB900';
        case percentage >= 80 && percentage < 100:
            return 'greenA900';
        case percentage >= 50 && percentage < 80:
            return baseDataVisualizationColorsHelper.$_getColorByName('yellow')
                .main;
        case percentage < 50 && percentage > 0:
            return baseDataVisualizationColorsHelper.$_getColorByName('orange')
                .main;
        default:
            return 'grey600';
    }
};

export default {
    $_setColor(percentage) {
        return setColor(percentage);
    },
};
