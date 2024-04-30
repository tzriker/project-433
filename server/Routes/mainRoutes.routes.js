const router = require("express").Router();
const employeeRoutes = require("./employee.routes");

router.use("/employees", employeeRoutes);

// Error handler middleware
router.use((err, req, res, net) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

module.exports = router;
