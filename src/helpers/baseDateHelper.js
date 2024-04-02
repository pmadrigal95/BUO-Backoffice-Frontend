/**
 * Descripción: Métodos para Fechas
 *
 * @displayName baseDateHelper
 */

const currentDate = () => {
    const date = new Date();

    let day = date.getDate().toString();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day.padStart(2, '0');

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month > 9 ? month : '0' + month}-${day}`;

    return currentDate;
};

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

const compareDates = ({ firstDate, secondDate, operator = '<=' }) => {
    // Create two Date objects
    const firstDateFormat = new Date(firstDate);
    const secondDateFormat = new Date(secondDate);

    // Convert the dates to ISO strings
    const firstISODate = firstDateFormat.toISOString();
    const secondISODate = secondDateFormat.toISOString();

    switch (operator) {
        case '<':
            return firstISODate < secondISODate;
        case '>':
            return firstISODate > secondISODate;
        case '>=':
            return firstISODate >= secondISODate;
        case '<=':
            return firstISODate <= secondISODate;
        case '==':
            return firstISODate == secondISODate;
        case '!=':
            return firstISODate != secondISODate;
        default:
            return undefined;
    }
};

export default {
    $_setCurrentDate() {
        return currentDate();
    },

    $_setCurrentMonth() {
        return currentMonth();
    },

    $_completeDate(incompleteDate) {
        return completeDate(incompleteDate);
    },

    $_compareDates({ firstDate, secondDate, operator }) {
        return compareDates({ firstDate, secondDate, operator });
    },
};
