const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    customerFirstName: String,
    customerLastName: String,
    companyName: String,
    dateAdded: String,
    dateOfContract: String,
    supplierName: String,
    meetingNotes: [{type: mongoose.Schema.Types.String}]
});

clientSchema.index({ customerFirstName: 1, companyName: 1 }, { unique: true });
const client = mongoose.model('clientinformations', clientSchema);

module.exports = client;