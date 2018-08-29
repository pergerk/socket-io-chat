import Vue from "vue";
import Router from "vue-router";
import store from './store';

var router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login.vue")
    },
    {
      path: "/",
      name: "main",
      component: () => import("./components/Main.vue"),
      children: [
        {
          name: "chat",
          path: "/:id",
          props: true,
          component: () => import("./components/Chat.vue")
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  store.dispatch("checkAuth").then(() => {
    const authenticated = store.state.authenticated;
    if (authRequired && !authenticated) {
      return next("/login");
    }
    next();
  });
});


export default router;
