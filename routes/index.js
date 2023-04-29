const tokenController = require('../controllers/tokenController');

router.post('/tokens/createAccount', tokenController.createAccount);
router.post('/tokens/buy', tokenController.buyTokens);
router.post('/tokens/transfer', tokenController.transferTokens);
router.get('/tokens/balance', tokenController.getBalance);
