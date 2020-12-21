import Router from './core/router/index.js';
import AuthController from './blocks/Auth/index.js'
import SigninController from './blocks/Signin/index.js'
import ChatsController from './blocks/Chats/index.js';
import SettingsController from './blocks/Settings/index.js';

declare global {
  interface Window {
    router:any;
  }
}

const router = new Router("#app");
window.router = router;

router
  .use("/auth", AuthController)
  .use("/signin", SigninController)
  .use("/chats", ChatsController)
  .use("/settings", SettingsController)
  .start();