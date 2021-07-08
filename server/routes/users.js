const router = require('express').Router();
const { login, register, verify } = require('../controllers/users');
const { authRequired } = require('../middlewares');

router.post('/login', login);
router.post('/register', register);
router.get('/verify', authRequired, verify);

module.exports = router;
