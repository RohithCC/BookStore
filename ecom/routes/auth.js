const express = require('express');
const router = express.Router();


const { signup, signin, requireSignin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
    res.send("hellop there");
});


module.exports = router;