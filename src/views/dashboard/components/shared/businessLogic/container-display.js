/**
 * Descripción: Configuraciones Generales display Dashboard
 *
 * @displayName container-display.js
 */

const isObject = (val) => val instanceof Object;

const objectHasData = (value) => {
    if (!isObject(value)) false;

    let counter = 0;

    // Using array methods
    Object.entries(value).forEach(([, value]) => {
        if (value) {
            counter++;
        }
    });

    return counter > 0 ? true : false;
};

const hasData = (data) => {
    if (!data) return false;

    if (typeof data === 'object') {
        if (Array.isArray(data) && data.length <= 0) {
            return false;
        } else {
            return objectHasData(data);
        }
    }

    return true;
};

export default {
    $_setLayout(nextColumn, columnSize = 6) {
        return hasData(nextColumn) ? columnSize : 12;
    },
};
