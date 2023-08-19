const { userRegistration, userLogin, getLoggedUser, updateUser, deleteUser } = require("../controllers/userController");
const { authUser } = require("../middlewares/user-auth-middleware");

const router = require("express").Router();

//USER_REGISTRATION || POST
router.post("/user_registration", userRegistration);

//USER_LOGIN || POST
router.post("/user_login", userLogin);

//GET_LOGGED_USER || GET
router.get("/get_logged_user/:id", getLoggedUser);

//UPDATE_USER || PUT
router.put("/update_user/:id", authUser,updateUser);

//DELETE_USER || DELETE
router.delete("/delete_user/:id",authUser, deleteUser);


module.exports = router;