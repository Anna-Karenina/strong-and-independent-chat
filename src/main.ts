import Router from './core/router/index.js';
import AuthController from './blocks/Auth/AuthController.js'

declare global {
  interface Window {
    router:any;
  }
}

const router = new Router("#app");
window.router = router;

router
  .use("/auth", AuthController)
  .start();