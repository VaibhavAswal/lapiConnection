const router = require("express").Router();

const { register, changeCameraAgl } = require("../controllers/lapiController");

router.get("/System/UpServer/Register", register);
router.post("/changeangle", changeCameraAgl);

module.exports = router;
