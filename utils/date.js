const monthNames = require('../configs/monthName.json');

const getTodaysDate = () => {
    const dateObject = new Date();

    const DELIMITER = " ";
    const date = dateObject.getUTCDate().toString();
    const month = monthNames.monthNames[dateObject.getUTCMonth()];
    const year = dateObject.getUTCFullYear().toString();

    return date + DELIMITER + month + DELIMITER + year;
}

module.exports = {
    getTodaysDate
}