const router = require("express").Router();

const { register } = require("../controllers/lapiController");

router.get("/System/UpServer/Register", register);

module.exports = router;
