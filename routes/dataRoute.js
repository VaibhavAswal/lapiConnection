const router = require("express").Router();

const { getChats,startAnalytics } = require("../controllers/dataController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/getChats", authenticateToken, getChats);
router.post("/startanalytics", startAnalytics);

module.exports = router;
