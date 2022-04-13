const router = require("express").Router();
const authController = require("../controllers/authController");

//routes to the according function in the authController file,
//according to the request made
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
