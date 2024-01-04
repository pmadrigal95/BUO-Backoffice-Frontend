/**
 * Descripción: Métodos para Fechas
 *
 * @displayName baseDateHelper
 */

const currentMonth = () => {
    const date = new Date();

    // let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month > 9 ? month : '0' + month}`;

    return currentDate;
};

const completeDate = (incompleteDate) => {
    return `${incompleteDate}-01`;
};

export default {
    $_setCurrentMonth() {
        return currentMonth();
    },

    $_completeDate(incompleteDate) {
        return completeDate(incompleteDate);
    },
};
