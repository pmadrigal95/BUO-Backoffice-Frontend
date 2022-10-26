/**
 * Descripción: Métodos reutilizables
 *
 * @displayName BaseSharedFnHelper
 */

const rightJoin = ({ leftArrray, rightArray, key }) => {
    const map = new Map();
    leftArrray.forEach((item) => map.set(item[key], item));

    let join = [];

    rightArray.forEach((rigthItem) => {
        const leftItem = map.get(rigthItem[key]);
        if (leftItem === undefined) {
            join.push({ ...rigthItem });
        } else {
            join.push({ ...leftItem, ...rigthItem });
        }
    });

    return join;
};

const leftJoin = ({ leftArrray, rightArray, key }) => {
    const map = new Map();
    rightArray.forEach((item) => map.set(item[key], item));

    let join = [];

    leftArrray.forEach((leftItem) => {
        const rigthItem = map.get(leftItem[key]);
        if (rigthItem === undefined) {
            join.push({ ...leftItem });
        } else {
            join.push({ ...leftItem, ...rigthItem });
        }
    });

    return join;
};

const fullJoin = ({ leftArrray, rightArray, key }) => {
    const arr = [
        ...rightJoin({
            leftArrray: leftArrray,
            rightArray: rightArray,
            key: key,
        }),
        ...leftJoin({
            leftArrray: leftArrray,
            rightArray: rightArray,
            key: key,
        }),
    ];

    return Array.from(new Set(arr.map((a) => a[key]))).map((id) => {
        return arr.find((a) => a[key] === id);
    });
};

const innerJoin = ({ leftArrray, rightArray, key }) => {
    const map = new Map();
    leftArrray.forEach((item) => map.set(item[key], item));

    let join = [];

    rightArray.forEach((rigthItem) => {
        const leftItem = map.get(rigthItem[key]);
        if (leftItem === undefined) return;

        join.push({ ...leftItem, ...rigthItem });
    });

    return join;
};

export default {
    $_getInitialDay() {
        const fechaInicio = new Date();
        // Iniciar en este año, este mes, en el día 1
        return new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    },

    $_getFinalDay() {
        const fechaFin = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        return new Date(fechaFin.getFullYear(), fechaFin.getMonth() + 1, 0);
    },

    $_openNewTab(url) {
        window.open(url, '_blank').focus();
    },

    $_redirect(url) {
        console.log(window.location.origin + '/' + url);
        window.location.replace(window.location.origin + '/' + url);
    },

    $_confirmReload() {
        window.onbeforeunload = function (e) {
            e = e || window.event;
            //old browsers
            if (e) {
                e.returnValue =
                    'Es posible que los cambios que haya realizado no se guarden';
            }
            //safari, chrome(chrome ignores text)
            return 'Es posible que los cambios que haya realizado no se guarden';
        };
    },

    $_returnColorGraph(number) {
        if (number >= 0 && number <= 20) {
            return '#FFAC00';
        } else if (number <= 45 && number > 20) {
            return '#6DC629';
        } else if (number <= 85 && number > 45) {
            return '#01AA71';
        } else {
            return '#117C56';
        }
    },

    $_returnRandomPDAGradient() {
        return `pda-gradient-${Math.round(Math.random() * 6 + 1)}`;
    },

    $_checkValueNull(value) {
        if (!value || value == null || value == undefined) {
            return true;
        } else {
            if (typeof value === 'string') {
                if (value == '') {
                    return true;
                }
            } else {
                if (value.length <= 0) {
                    return true;
                }
            }
            return false;
        }
    },

    $_getObjectFromArray(array, id, key = 'id') {
        return array.find((element) => element[key] == id);
    },

    $_returnCurrentIndex(array, id, key = 'id') {
        return array.indexOf(this.$_getObjectFromArray(array, id, key));
    },

    $_removeDuplicates(origen, key = 'id') {
        const array = [];
        if (origen) {
            origen.forEach((element) => {
                let object = this.$_getObjectFromArray(
                    array,
                    element[key],
                    key
                );

                if (!object) {
                    array.push(element);
                }
            });
        }

        return array;
    },

    $_createArrObjFromProperty(arr, key) {
        var result = [];
        arr.forEach(function (elemento) {
            let object = {};
            object[key] = elemento[key];
            result.push(object);
        });
        return result;
    },

    $_createArrFromProperty(arr, key) {
        var result = [];
        arr.forEach(function (elemento) {
            let object = {};
            object[key] = elemento[key];
            result.push(object[key]);
        });
        return result;
    },

    $_fullJoin(leftArrray, rightArray, key) {
        return fullJoin({
            leftArrray: leftArrray,
            rightArray: rightArray,
            key: key,
        });
    },

    $_innerJoin(leftArrray, rightArray, key) {
        return innerJoin({
            leftArrray: leftArrray,
            rightArray: rightArray,
            key: key,
        });
    },
};
