const { Schema, model } = require("mongoose")
 
const EmployeeSchema = new Schema({
    id: { type: String, required: true, unique: true,  },
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
}, { timestamps: true })

const Employee = model("Employee", EmployeeSchema)

module.exports = Employee; 