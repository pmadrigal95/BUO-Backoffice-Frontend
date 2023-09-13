/**
 * Descripción: Data Visualization Colors Helper
 *
 * @displayName baseDataVisualizationColorsHelper
 */

const colorConfig = {
    amigable: {
        backgroundColor: '#C9F31A',
        hoverBackgroundColor: '#C9F31A',
        hoverBorderColor: '#ABD500',
        borderColor: '#C9F31A',
    },

    amable: {
        backgroundColor: '#96E57B',
        hoverBackgroundColor: '#96E57B',
        hoverBorderColor: '#4EAC3E',
        borderColor: '#96E57B',
    },

    audaz: {
        backgroundColor: '#F56C60',
        hoverBackgroundColor: '#F56C60',
        hoverBorderColor: '#CF6358',
        borderColor: '#F56C60',
    },

    cautivadora: {
        backgroundColor: '#EFEA51',
        hoverBackgroundColor: '#EFEA51',
        hoverBorderColor: '#D8C363',
        borderColor: '#EFEA51',
    },

    colaboradora: {
        backgroundColor: '#68CB57',
        hoverBackgroundColor: '#68CB57',
        hoverBorderColor: '#589F55',
        borderColor: '#68CB57',
    },

    concreta: {
        backgroundColor: '#59A4CF',
        hoverBackgroundColor: '#59A4CF',
        hoverBorderColor: '#5787AB ',
        borderColor: '#59A4CF ',
    },

    convincente: {
        backgroundColor: '#FE9889',
        hoverBackgroundColor: '#FE9889',
        hoverBorderColor: '#F56C60',
        borderColor: '#FE9889',
    },

    creativa: {
        backgroundColor: '#FDB8D9',
        hoverBackgroundColor: '#FDB8D9',
        hoverBorderColor: '#FFB9B3',
        borderColor: '#FDB8D9',
    },

    detallista: {
        backgroundColor: '#CF6358',
        hoverBackgroundColor: '#CF6358',
        hoverBorderColor: '#8E2B21',
        borderColor: '#CF6358',
    },

    determinada: {
        backgroundColor: '#FFB9B3',
        hoverBackgroundColor: '#FFB9B3',
        hoverBorderColor: '#FE9889',
        borderColor: '#FFB9B3',
    },

    dinamica: {
        backgroundColor: '#BC5E8F',
        hoverBackgroundColor: '#BC5E8F',
        hoverBorderColor: '#FF87C3',
        borderColor: '#BC5E8F',
    },

    diplomatica: {
        backgroundColor: '#589F55',
        hoverBackgroundColor: '#589F55',
        hoverBorderColor: '#569D97',
        borderColor: '#589F55',
    },

    encantadora: {
        backgroundColor: '#FEE577',
        hoverBackgroundColor: '#FEE577',
        hoverBorderColor: '#FFC759',
        borderColor: '#FEE577',
    },

    indagadora: {
        backgroundColor: '#B9A7DF',
        hoverBackgroundColor: '#B9A7DF',
        hoverBorderColor: '#8D77BA',
        borderColor: '#FEE577',
    },

    influyente: {
        backgroundColor: '#FFC759',
        hoverBackgroundColor: '#FFC759',
        hoverBorderColor: '#F6A05C',
        borderColor: '#FFC759',
    },

    intuitiva: {
        backgroundColor: '#FF81C1',
        hoverBackgroundColor: '#FF81C1',
        hoverBorderColor: '#FFC8E2',
        borderColor: '#FF81C1',
    },

    investigadora: {
        backgroundColor: '#569D97',
        hoverBackgroundColor: '#569D97',
        hoverBorderColor: '#58C6B4',
        borderColor: '#569D97',
    },

    logica: {
        backgroundColor: '#9CF2E5',
        hoverBackgroundColor: '#9CF2E5',
        hoverBorderColor: '#65CEBE',
        borderColor: '#9CF2E5',
    },

    paciente: {
        backgroundColor: '#9D75DE',
        hoverBackgroundColor: '#9D75DE',
        hoverBorderColor: '#B9A7DF',
        borderColor: '#9D75DE',
    },

    precisa: {
        backgroundColor: '#8ED6FE',
        hoverBackgroundColor: '#8ED6FE',
        hoverBorderColor: '#56BEFF',
        borderColor: '#8ED6FE',
    },

    proactiva: {
        backgroundColor: '#F6A05C',
        hoverBackgroundColor: '#F6A05C',
        hoverBorderColor: '#C6702C',
        borderColor: '#F6A05C',
    },

    promotora: {
        backgroundColor: '#E066A3',
        hoverBackgroundColor: '#E066A3',
        hoverBorderColor: '#FFACD6',
        borderColor: '#E066A3',
    },

    receptiva: {
        backgroundColor: '#58C6B4',
        hoverBackgroundColor: '#58C6B4',
        hoverBorderColor: '#62ECDD',
        borderColor: '#58C6B4',
    },

    resolutiva: {
        backgroundColor: '#56BEFF',
        hoverBackgroundColor: '#56BEFF',
        hoverBorderColor: '#59A4CF',
        borderColor: '#56BEFF',
    },

    sensata: {
        backgroundColor: '#66DED0',
        hoverBackgroundColor: '#66DED0',
        hoverBorderColor: '#98EEE2',
        borderColor: '#66DED0',
    },

    tenaz: {
        backgroundColor: '#5787AB',
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
