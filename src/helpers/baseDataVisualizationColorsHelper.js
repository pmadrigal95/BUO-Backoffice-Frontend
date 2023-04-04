/**
 * Descripción: Data Visualization Colors Helper
 *
 * @displayName baseDataVisualizationColorsHelper
 */

const colorArray = [
    {
        main: '#039BBA',
        secondary80: '#35afc7',
        secondary70: '#68C3D6',
        secondary60: '#81CDDD',
        secondary50: '#B3E1EA',
        secondary40: '#CDEBF1',
    },
    {
        main: '#23706C',
        secondary80: '#4F8D89',
        secondary70: '#7BA9A7',
        secondary60: '#91B8B6',
        secondary50: '#BDD4D3',
        secondary40: '#D3E2E2',
    },
    {
        main: '#74A267',
        secondary80: '#90B585',
        secondary70: '#ACC7A4',
        secondary60: '#BAD0B3',
        secondary50: '#D5E3D1',
        secondary40: '#E3ECE1',
    },
    {
        main: '#B1B562',
        secondary80: '#C1C481',
        secondary70: '#D0D3A1',
        secondary60: '#D8DAB1',
        secondary50: '#E8E9D0',
        secondary40: '#EFF0E0',
    },
    {
        main: '#AB6B4C',
        secondary80: '#BC8970',
        secondary70: '#CDA694',
        secondary60: '#D5B5A5',
        secondary50: '#E6D3C9',
        secondary40: '#EEE1DB',
    },
    {
        main: '#7E3F5A',
        secondary80: '#98657B',
        secondary70: '#B28C9C',
        secondary60: '#BF9FAD',
        secondary50: '#D8C5CE',
        secondary40: '#E5D9DE',
    },
];

const random = () => {
    const index = Math.round(Math.random() * colorArray.length);
    return colorArray[index >= 0 && index < 6 ? index : 1];
};

const getColor = (index) => {
    if (index >= colorArray.length) {
        return random();
    } else {
        return colorArray[index];
    }
};

export default {
    $_randomColor() {
        return random();
    },

    $_getColor(index) {
        return getColor(index);
    },

    $_getColorByName(color) {
        let index = 0;
        switch (color) {
            case 'lightBlue':
                index = 0;
                break;
            case 'darkGreen':
                index = 1;
                break;
            case 'lightGreen':
                index = 2;
                break;
            case 'yellow':
                index = 3;
                break;
            case 'orange':
                index = 4;
                break;
            case 'purple':
                index = 5;
                break;
            default:
                index = 10;
                break;
        }
        return getColor(index);
    },
};
