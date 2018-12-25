const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onboardingSchema = new Schema({
    adminCode: {type: Boolean, required: true},
    code: {type: String, required: true}
});

module.exports = mongoose.model('OnboardingCode', onboardingSchema);
