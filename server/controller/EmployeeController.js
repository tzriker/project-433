const { default: mongoose } = require("mongoose");
const Employee = require("../Model/EmployeeModel");

const employeeController = {

    async createEmployee(req, res, next) {
        try {
            const newEmployee = new Employee(req.body);
            const savedEmployee = await newEmployee.save();
            res.status(201).json(savedEmployee);
        } catch (error) {
            next(error);
        }
    },

    async deleteEmployee(req, res, next) {
        const employeeId = req.params.id;
        try {
            const deletedEmployee = await Employee.findOneAndDelete({ id: employeeId });
            if (!deletedEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }
            res.status(200).json({ message: "Employee deleted successfully", deletedEmployee });
        } catch (error) {
            next(error);
        }
    },

    async updateEmployee(req, res, next) {
        const employeeId = req.params.id;
        const newData = req.body;
        try {
            const existingEmployee = await Employee.findOne({ id: employeeId });
            if (!existingEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }
    
            // Check if the __v in the database matches the __v in newData
            if (existingEmployee.__v !== newData.__v) {
                console.log(existingEmployee.__v + " "+ newData.__v);
                return res.status(409).json({ error: "Employee not updated: Version mismatch" });
            }
    
            // Increment the __v field in newData
            newData.__v = existingEmployee.__v + 1;
    
            // Perform the update
            const updatedEmployee = await Employee.findOneAndUpdate(
                { id: employeeId, __v: existingEmployee.__v }, // Check both id and __v
                newData,
                { new: true }
            );
    
            if (!updatedEmployee) {
                return res.status(404).json({ error: "Employee not found" });
            }
    
            res.status(200).json(updatedEmployee);
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    

    async getAllEmployees(req, res, next) {
        try {
            const allEmployees = await Employee.find();
            res.status(200).json(allEmployees);
        } catch (error) {
            next(error);
        }
    },

    async getEmployeeById(req, res, next) {
        try {
            const employee = await Employee.findOne({ id: req.params.id });

            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        } catch (error) {
            // Handle errors appropriately
            next(error);
        }
    }

}

module.exports = employeeController;
