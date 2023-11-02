const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    customerFirstName: String,
    customerLastName: String,
    companyName: String,
    dateAdded: String,
    supplierName: String,
    contractDate: String,
    contractDuration: String,
    contractPrice: [{type: mongoose.Schema.Types.Number}],
    meetingNotes: [{type: mongoose.Schema.Types.String}]
});

clientSchema.index({ customerFirstName: 1, companyName: 1 }, { unique: true });
const client = mongoose.model('clientinformations', clientSchema);

module.exports = client;