// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Adding a virtual property for employeeId that maps to _id
EmployeeSchema.virtual('employeeId').get(function() {
    return this._id.toHexString();
});

EmployeeSchema.set('toJSON', {
    virtuals: true
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
