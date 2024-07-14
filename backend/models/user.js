var mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    totalPriceDonated: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    type: { type: String, required: true },
    numDonations: { type: Number, default: 0 },
    medicines: { type: [mongoose.Schema.Types.ObjectId], ref: "Medicine", default: [] },
});

// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(user.password, salt);
//         user.password = hashedPassword;
//         next();
//     }
//     catch (err) {
//         return next(err);
//     }
// })

// userSchema.methods.comparePassword = async function (userPassword) {
//     try {
//         const isSame = bcrypt.compare(userPassword, this.password);
//         return isSame;
//     }
//     catch (err) {
//         throw err;
//     }
// }

module.exports = mongoose.model("User", UserSchema);