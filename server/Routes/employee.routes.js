const router = require("express").Router();
const employeeController = require("../controller/EmployeeController");

router.post("/", employeeController.createEmployee);

router.delete("/:id", employeeController.deleteEmployee);

router.get("/", employeeController.getAllEmployees);

router.get("/:id", employeeController.getEmployeeById);

router.put("/:id", employeeController.updateEmployee);


module.exports = router;
