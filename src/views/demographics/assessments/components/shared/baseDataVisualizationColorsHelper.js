import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const $_setColorDegradedChart = (value) => {
    const x = Math.round(value * 100);

    switch (true) {
        case x === 100:
            return 'main';
        case x > 50 && x < 100:
            return 'secondary80';
        case x === 50:
            return 'secondary70';
        case x < 50 && x > 0:
            return 'secondary60';
        case x === 0:
            return 'secondary50';
        default:
            return 'secondary0';
    }
};

const $_setChartColor = ({ value, color = 'darkGreen' }) => {
    const palette = baseDataVisualizationColorsHelper.$_getColorByName(color);

    const degradedColor = $_setColorDegradedChart(value ? value : -1);

    return palette[degradedColor];
};

export default {
    $_getColor({ value }) {
        return $_setChartColor({ value });
    },
};
