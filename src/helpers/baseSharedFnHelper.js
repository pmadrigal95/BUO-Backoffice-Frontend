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

const findNestedObj = (obj, key, value) => {
    try {
        JSON.stringify(obj, (_, nestedValue) => {
            if (nestedValue && nestedValue[key] === value) throw nestedValue;
            return nestedValue;
        });
    } catch (result) {
        return result;
    }
};

const findContraryNestedObj = (obj, key, value) => {
    try {
        JSON.stringify(obj, (_, nestedValue) => {
            if (nestedValue && nestedValue[key] != value) throw nestedValue;
            return nestedValue;
        });
    } catch (result) {
        return result;
    }
};

const findNestedObjLike = (obj, key, value) => {
    try {
        JSON.stringify(obj, (_, nestedValue) => {
            if (
                nestedValue &&
                nestedValue[key]?.toLowerCase().indexOf(value.toLowerCase()) >
                    -1
            )
                throw nestedValue;
            return nestedValue;
        });
    } catch (result) {
        return result;
    }
};

const commify = (n) => {
    let parts = n.toString().split('.');
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
        numberPart.replace(thousands, ',') +
        (decimalPart ? '.' + decimalPart : '')
    );
};

const addOrDiffDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
};

const reviewNumberDate = (number) => {
    return number > 9 ? number : `0${number}`;
};

const formatDate = (date) => {
    return `${date.getFullYear()}-${reviewNumberDate(
        date.getMonth() + 1
    )}-${reviewNumberDate(date.getDate())}`;
};

const chuckSize = (array, size) => {
    const chunkSize = size;
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
};

const getAge = (date) => {
    return Math.floor((new Date() - date.getTime()) / 3.15576e10);
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

    $_formatNumber(number) {
        return commify(number);
    },

    /**
     * Fn Dates
     */

    $_parseArrayToDateISOString(array) {
        if (Array.isArray(array) && array.length >= 3) {
            return `${array[0]}-${array[1] > 9 ? array[1] : '0' + array[1]}-${
                array[2] > 9 ? array[2] : '0' + array[2]
            }`;
        }
    },

    $_getCurrentDateISOString() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}-${month > 9 ? month : '0' + month}-${
            day > 9 ? day : '0' + day
        }`;

        return currentDate;
    },

    $_formatDate(date) {
        return formatDate(date);
    },

    $_addOrDiffDays(date, days, requiredFormat = true) {
        return requiredFormat
            ? formatDate(addOrDiffDays(date, days))
            : addOrDiffDays(date, days);
    },

    /**
     * Busqueda Recursiva
     */

    $_findNestedObj(obj, key, value) {
        return findNestedObj(obj, key, value);
    },

    $_findContraryNestedObj(obj, key, value) {
        return findContraryNestedObj(obj, key, value);
    },

    $_findNestedObjLike(obj, key, value) {
        return findNestedObjLike(obj, key, value);
    },

    $_chuckSize(array, size) {
        return chuckSize(array, size);
    },

    $_getAge(date) {
        return getAge(date);
    },
};
