/**
 * Descripción: Configuraciones Generales display Dashboard
 *
 * @displayName container-display.js
 */

const breakpoints = {
    small: 1024,
    large: 1800,
};

const layout = (innerWidth) => {
    if (innerWidth <= breakpoints.small) return 12;

    return 6;
};

export default {
    $_setLayout({ nextColumn, innerWidth }) {
        return nextColumn ? layout(innerWidth) : 12;
    },
};
