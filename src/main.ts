import Router from '@core/router/index';
import AuthController from '@/blocks/Auth/index'
import RegistrationController from '@/blocks/Registration/index'
import ChatsController from '@/blocks/Chats/index';
import SettingsController from '@/blocks/Settings/index';
import FallbackPage from '@/blocks/404/Page404';
import ErrorPage from '@/blocks/500/Page500';
import {deepClone} from '@core/utils/index';
import {authEvent} from '@core/events/index';
import {authService} from '@core/services/index';
import {store} from '@/store';

import '@/styles/common.scss';

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

