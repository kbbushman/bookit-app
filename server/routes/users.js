const router = require('express').Router();
const {
  login,
  register,
  authRequired,
  verifyAuth,
} = require('../controllers/users');

router.post('/login', login);
router.post('/register', register);
router.get('/verify', authRequired, verifyAuth);

module.exports = router;
