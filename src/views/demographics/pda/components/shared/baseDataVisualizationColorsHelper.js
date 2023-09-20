/**
 * Descripción: Data Visualization Colors Helper
 *
 * @displayName baseDataVisualizationColorsHelper
 */

const colorConfig = {
    amigable: {
        backgroundColor: 'rgba(201, 243, 26, 0.7)',
        hoverBackgroundColor: '#C9F31A',
        hoverBorderColor: '#ABD500',
        borderColor: '#C9F31A',
    },

    amable: {
        backgroundColor: 'rgba(150, 229, 123, 0.7)',
        hoverBackgroundColor: '#96E57B',
        hoverBorderColor: '#4EAC3E',
        borderColor: '#96E57B',
    },

    audaz: {
        backgroundColor: 'rgba(245, 108, 96, 0.7)',
        hoverBackgroundColor: '#F56C60',
        hoverBorderColor: '#CF6358',
        borderColor: '#F56C60',
    },

    cautivadora: {
        backgroundColor: 'rgba(239, 234, 81, 0.7)',
        hoverBackgroundColor: '#EFEA51',
        hoverBorderColor: '#D8C363',
        borderColor: '#EFEA51',
    },

    colaboradora: {
        backgroundColor: 'rgba(104, 203, 87, 0.7)',
        hoverBackgroundColor: '#68CB57',
        hoverBorderColor: '#589F55',
        borderColor: '#68CB57',
    },

    concreta: {
        backgroundColor: 'rgba(89, 164, 207, 0.7)',
        hoverBackgroundColor: '#59A4CF',
        hoverBorderColor: '#5787AB ',
        borderColor: '#59A4CF ',
    },

    convincente: {
        backgroundColor: 'rgba(254, 152, 137, 0.7)',
        hoverBackgroundColor: '#FE9889',
        hoverBorderColor: '#F56C60',
        borderColor: '#FE9889',
    },

    creativa: {
        backgroundColor: 'rgba(253, 184, 217, 0.7)',
        hoverBackgroundColor: '#FDB8D9',
        hoverBorderColor: '#FFB9B3',
        borderColor: '#FDB8D9',
    },

    detallista: {
        backgroundColor: 'rgba(207, 99, 88, 0.7)',
        hoverBackgroundColor: '#CF6358',
        hoverBorderColor: '#8E2B21',
        borderColor: '#CF6358',
    },

    determinada: {
        backgroundColor: 'rgba(255, 185, 179, 0.7)',
        hoverBackgroundColor: '#FFB9B3',
        hoverBorderColor: '#FE9889',
        borderColor: '#FFB9B3',
    },

    dinamica: {
        backgroundColor: 'rgba(188, 94, 143, 0.7)',
        hoverBackgroundColor: '#BC5E8F',
        hoverBorderColor: '#FF87C3',
        borderColor: '#BC5E8F',
    },

    diplomatica: {
        backgroundColor: 'rgba(88, 159, 85, 0.7)',
        hoverBackgroundColor: '#589F55',
        hoverBorderColor: '#569D97',
        borderColor: '#589F55',
    },

    encantadora: {
        backgroundColor: 'rgba(254, 229, 119, 0.7)',
        hoverBackgroundColor: '#FEE577',
        hoverBorderColor: '#FFC759',
        borderColor: '#FEE577',
    },

    indagadora: {
        backgroundColor: 'rgba(185, 167, 223, 0.7)',
        hoverBackgroundColor: '#B9A7DF',
        hoverBorderColor: '#8D77BA',
        borderColor: '#FEE577',
    },

    influyente: {
        backgroundColor: 'rgba(255, 199, 89, 0.7)',
        hoverBackgroundColor: '#FFC759',
        hoverBorderColor: '#F6A05C',
        borderColor: '#FFC759',
    },

    intuitiva: {
        backgroundColor: 'rgba(255, 129, 193, 0.7)',
        hoverBackgroundColor: '#FF81C1',
        hoverBorderColor: '#FFC8E2',
        borderColor: '#FF81C1',
    },

    investigadora: {
        backgroundColor: 'rgba(86, 157, 151, 0.7)',
        hoverBackgroundColor: '#569D97',
        hoverBorderColor: '#58C6B4',
        borderColor: '#569D97',
    },

    logica: {
        backgroundColor: 'rgba(156, 242, 229, 0.7)',
        hoverBackgroundColor: '#9CF2E5',
        hoverBorderColor: '#65CEBE',
        borderColor: '#9CF2E5',
    },

    paciente: {
        backgroundColor: 'rgba(157, 117, 222, 0.7)',
        hoverBackgroundColor: '#9D75DE',
        hoverBorderColor: '#B9A7DF',
        borderColor: '#9D75DE',
    },

    precisa: {
        backgroundColor: 'rgba(142, 214, 254, 0.7)',
        hoverBackgroundColor: '#8ED6FE',
        hoverBorderColor: '#56BEFF',
        borderColor: '#8ED6FE',
    },

    proactiva: {
        backgroundColor: 'rgba(246, 160, 92, 0.7)',
        hoverBackgroundColor: '#F6A05C',
        hoverBorderColor: '#C6702C',
        borderColor: '#F6A05C',
    },

    promotora: {
        backgroundColor: 'rgba(224, 102, 163, 0.7)',
        hoverBackgroundColor: '#E066A3',
        hoverBorderColor: '#FFACD6',
        borderColor: '#E066A3',
    },

    receptiva: {
        backgroundColor: 'rgba(88, 198, 180, 0.7)',
        hoverBackgroundColor: '#58C6B4',
        hoverBorderColor: '#62ECDD',
        borderColor: '#58C6B4',
    },

    resolutiva: {
        backgroundColor: 'rgba(86, 190, 255, 0.7)',
        hoverBackgroundColor: '#56BEFF',
        hoverBorderColor: '#59A4CF',
        borderColor: '#56BEFF',
    },

    sensata: {
        backgroundColor: 'rgba(102, 222, 208, 0.7)',
        hoverBackgroundColor: '#66DED0',
        hoverBorderColor: '#98EEE2',
        borderColor: '#66DED0',
    },

    tenaz: {
        backgroundColor: 'rgba(87, 135, 171, 0.7)',
        hoverBackgroundColor: '#5787AB',
        hoverBorderColor: '#81AFD2',
        borderColor: '#5787AB',
    },
};

const getColor = ({ profile, type }) => {
    const color = colorConfig?.[profile]?.[type];
    return color ? color : '#003F5E';
};

export default {
    $_getColor({ profile, type }) {
        return getColor({ profile, type });
    },
};
