const express = require("express");
const router = express.Router();
const authController = require('./authController');
const authprotect = require('./middleware');
const todoController = require('./todoController');


router.get("/", (req, res) => {
	res.send({ response: "Server is up and running." }).status(200);
  });
  
router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/me').get(authprotect.protect, authController.getMe);

router
	.route('/token')
	.post(authprotect.protect, authController.generateAccessToken);
router
	.route('/updatepassword')
	.put(authprotect.protect, authController.updatePassword);
router
	.route('/forgotpassword')
	.post(authprotect.protect, authController.forgotPassword);
router.route('/logout').post(authController.protect, authController.logout);

router.route('/syncTodo').post(authprotect.protect, todoController.saveTodoBulk);
router.route('/addTodo').post(authprotect.protect, todoController.saveTodo);
router.route('/getTodo').get(authprotect.protect, todoController.getTodoByUser);
router.route('/deleteTodo').post(authprotect.protect, todoController.deleteTodo);

module.exports = router;
