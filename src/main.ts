import Router from './core/router/index.js';
import AuthController from './blocks/Auth/index.js'
import SigninController from './blocks/Signin/index.js'

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
  .start();