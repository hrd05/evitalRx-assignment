const router = require("express").Router();

const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.put('/update-profile', authMiddleware.authenticate, userController.updateProfile);

module.exports = router;