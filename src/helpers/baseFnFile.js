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
        const extensionFile = `.${file.name.split('.').pop()}`.toLowerCase();
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

// This function is used to detect the actual image type,
const getMimeType = (file, fallback = null) => {
    const byteArray = new Uint8Array(file).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16);
    }
    switch (header) {
        case '89504e47':
            return 'image/png';
        case '47494638':
            return 'image/gif';
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            return 'image/jpeg';
        default:
            return fallback;
    }
};

const uploadFileCallback = (result) => {
    return result;
};

const uploadFile = (event, callback) => {
    const _URL = window.URL || window.webkitURL;
    // Reference to the DOM input element
    const { files } = event.target;
    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        // if (this.image.src) {
        //     URL.revokeObjectURL(this.image.src);
        // }
        // 2. Create the blob link to the file to optimize performance:
        const blob = _URL.createObjectURL(files[0]);

        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }

        // Create a new FileReader to read this image binary data
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
            // Note: arrow function used here, so that "this.image" refers to the image of Vue component
            callback({
                // Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
                src: blob,
                // Determine the image type to preserve it during the extracting the image from canvas:
                type: getMimeType(e.target.result, files[0].type),

                file: files[0],
            });
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0]);
    }
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

    $_getMimeType(file, fallback) {
        return getMimeType(file, fallback);
    },

    $_upload(event, callback) {
        return uploadFile(event, callback);
    },

    $_uploadCallback(result) {
        return uploadFileCallback(result);
    },
};
