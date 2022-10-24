/**
 * Descripción: Métodos para utilizar Arrays
 *
 * @displayName BaseArrayHelper
 */

export default {
    AddToArray(array, value, prop = undefined, validar = true) {
        if (Array.isArray(array)) {
            if (validar) {
                if (prop != undefined) {
                    let obj = this.SearchItem(array, value, prop);
                    if (obj == undefined) {
                        array.push(value);
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                array.push(value);
            }
        }
    },

    GetObjIndex(array, value) {
        if (Array.isArray(array)) {
            return array.indexOf(value);
        }
    },

    SetObject(array, value) {
        return Object.assign(array, value);
    },

    DeleteObj(array, index) {
        if (Array.isArray(array)) {
            array.splice(index, 1);
        }
    },

    SearchItem(array, value, prop) {
        if (Array.isArray(array)) {
            return array.find((Element) => Element[prop] === value[prop]);
        }
    },
};
