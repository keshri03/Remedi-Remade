var mongoose = require("mongoose");

var MedicineSchema = new mongoose.Schema({
    medNameAndStrength: { type: String, required: true },
    quantityType: { type: String, required: true },
    availableQuantity: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalWorth: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    ndc: { type: String, required: true },
    username: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    listDate: { type: Date, required: true },
});

module.exports = mongoose.model("Medicine", MedicineSchema);
