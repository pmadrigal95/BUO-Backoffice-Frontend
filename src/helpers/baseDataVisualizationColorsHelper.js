/**
 * Descripción: Data Visualization Colors Helper
 *
 * @displayName baseDataVisualizationColorsHelper
 */

const colorArray = [
    {
        main: '#039BBA',
        secondary80: 'rgba(3, 155, 186, 0.5)',
    },
    {
        main: '#23706C',
        secondary80: 'rgba(35, 112, 108, 0.5)',
    },
    {
        main: '#74A267',
        secondary80: 'rgba(116, 162, 103, 0.5)',
    },
    {
        main: '#B1B562',
        secondary80: 'rgba(177, 181, 98, 0.5)',
    },
    {
        main: '#AB6B4C',
        secondary80: 'rgba(171, 107, 76, 0.5)',
    },
    {
        main: '#7E3F5A',
        secondary80: 'rgba(126, 63, 90, 0.5)',
    },
];

const random = () => {
    return colorArray[Math.round(Math.random() * colorArray.length)];
};

export default {
    $_randomColor() {
        return random();
    },

    $_getColor(index) {
        if (index >= colorArray.length) {
            return random();
        } else {
            return colorArray[index];
        }
    },
};
