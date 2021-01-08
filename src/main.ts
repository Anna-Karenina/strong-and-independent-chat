import Router from '@core/router';
import AuthController from '@/blocks/Auth'
import RegistrationController from '@/blocks/Registration'
import ChatsController from '@/blocks/Chats';
import SettingsController from '@/blocks/Settings';
import FallbackPage from '@/blocks/404';
import ErrorPage from '@/blocks/500';
import {deepClone} from '@core/utils';
import {authEvent} from '@core/events';
import {authService} from '@core/services';
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

