import Router from './core/router/index.js';
import AuthController from './blocks/Auth/index.js'
import RegistrationController from './blocks/Registration/index.js'
import ChatsController from './blocks/Chats/index.js';
import SettingsController from './blocks/Settings/index.js';
import FallbackPage from './blocks/404/Page404.js';
import ErrorPage from './blocks/500/Page500.js';
import {deepClone} from './core/utils/index.js';
import {authEvent} from './core/events/index.js';
import {authService} from './core/services/index.js';
import {store} from './store.js';

store.subscribe((newState) => {
  console.log('storeUpdate', deepClone(newState));
});

const router = new Router("#app");

authService.connect({store});

authEvent.init({router});

router
  .use("/auth", AuthController)
  .use("/registration", RegistrationController)
  .use("/chats", ChatsController)
  .use("/settings", SettingsController)
  .use("/500", ErrorPage)
  .fallback(FallbackPage)
  .start();

