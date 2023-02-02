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
        extension: ['.xls', 'xlsx'],
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
};

//funcion flecha como shared fn helper

const isCorrectExtension = (file, extension) => {
    try {
        let result = false;
        if (!file.name.endsWith(`.${extension}`)) {
            return result;
        }
    } catch (result) {
        return result;
    }
};

/**
 * Description: functions used for files
 */
export default {
    $_extensionsFile: extensionsFile,

    $_convertToBase64(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            console.log(base64String);
        };
        reader.readAsDataURL(file);
    },

    $_isCorrectExtension(file, extension) {
        return isCorrectExtension(file, extension);
    },
};
