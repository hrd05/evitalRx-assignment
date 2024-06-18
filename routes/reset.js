const router = require("express").Router();

const resetController = require('../controllers/reset');

router.post('/forgot-password', resetController.forgotPassword);

router.get('/reset-password/:id', resetController.resetPassword);

router.get('/update-password/:id', resetController.updatePassword);

module.exports = router;