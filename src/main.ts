import Router from './core/router/index.js';
import AuthController from './blocks/Auth/index.js'
import SigninController from './blocks/Signin/index.js'
import ChatsController from './blocks/Chats/index.js';
import SettingsController from './blocks/Settings/index.js';
import FallbackPage from './blocks/404/Page404.js';
import ErrorPage from './blocks/500/Page500.js';

const router = new Router("#app");

router
  .use("/auth", AuthController)
  .use("/signin", SigninController)
  .use("/chats", ChatsController)
  .use("/settings", SettingsController)
  .use("/404", FallbackPage)
  .use("/500", ErrorPage)
  .start();