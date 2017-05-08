const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.post('/', mid.requiresLogin, controllers.Account.gamePage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/', mid.requiresLogin, controllers.Account.gamePage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout, controllers.Account.logout);
  app.get('/settings', mid.requiresLogin, controllers.Account.settings);
};

module.exports = router;
