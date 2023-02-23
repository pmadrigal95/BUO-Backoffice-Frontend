/**
 * Description: Object with the extensions that an input file can handle
 * Font: https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * Other font: https://es.stackoverflow.com/questions/198265/cu%C3%A1l-es-el-tipo-de-mime-archivos-del-paquete-de-office
 * Ohter font: https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */

const extensionsFile = {
    doc: {
        extension: ['.doc', '.docx'],
        documentType: 'Microsoft Word',
        mimeType: [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml',
            'application/vnd.ms-word',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    },

    excel: {
        extension: ['.xls', '.xlsx'],
        documentType: 'Microsoft Excel',
        mimeType: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ],
    },

    imagenes: {
        extension: ['.jpg', '.jpeg', '.png'],
        documentType: 'Imágenes JPEG y PNG',
        mimeType: ['image/jpeg', 'image/png'],
    },

    pdf: {
        extension: ['.pdf'],
        documentType: 'Archivos PDF',
        mimeType: ['application/pdf'],
    },

    zip: {
        extension: ['.zip'],
        documentType: 'Archivos ZIP',
        mimeType: ['text/plain'],
    },
};

const extensionsName = {
    doc: 'doc',

    excel: 'excel',

    imagenes: 'imagenes',

    pdf: 'pdf',

    zip: 'zip',
};

const isCorrectExtension = (file, fileType) => {
    try {
        const extensionFile = `.${file.name.split('.').pop()}`;
        if (
            extensionsFile[fileType].extension.some(
                (element) => element === extensionFile
            )
        ) {
            return true;
        }
    } catch (result) {
        return false;
    }
};

const isCorrectMime = (file, fileType) => {
    try {
        if (
            extensionsFile[fileType].mimeType.some(
                (element) => element === file.type
            )
        ) {
            return true;
        }
    } catch (result) {
        return false;
    }
};

//TODO: Revisar en IOS.
const isCorrectSize = (file, widthProperty, heightProperty) => {
    let result = true;
    try {
        const _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
            if (
                (widthProperty != undefined && widthProperty > this.width) ||
                (heightProperty != undefined && heightProperty >= this.height)
            ) {
                result = false;
                return result;
            }
        };
        img.src = _URL.createObjectURL(file);
        return result;
    } catch (result) {
        return false;
    }
};

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
            resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
        reader.onerror = (error) => reject(error);
    });
};

//TODO: How to implement when de file has sheveral types mime as excel, word or images
const dowloadFile = (file, nameFile, fileType) => {
    const mimeType = extensionsFile[fileType].mimeType[0];
    /*const mimeType = extensionsFile[fileType].mimeType.find(
        (element) => element === file.type
    );*/
    const anchor_href = `data:${mimeType};base64,` + file;
    const link = document.createElement('a');
    link.href = anchor_href;
    link.setAttribute('download', nameFile);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

/**
 * Description: functions used for files
 */
export default {
    $_extensionsName: extensionsName,

    $_extensionsFile: extensionsFile,

    $_isCorrectExtension(file, extension) {
        return isCorrectExtension(file, extension);
    },

    $_isCorrectMime(file, extension) {
        return isCorrectMime(file, extension);
    },

    $_convertToBase64(file) {
        return convertToBase64(file);
    },

    $_dowloadFile(file, nameFile, fileType) {
        return dowloadFile(file, nameFile, fileType);
    },

    $_isCorrectSize(file, width, height) {
        return isCorrectSize(file, width, height);
    },
};
