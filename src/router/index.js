import Vue from 'vue';
import VueRouter from 'vue-router';
import main from './main';

Vue.use(VueRouter);

const routes = [...main];

const router = new VueRouter({
  routes,
});

router.afterEach((route) => {
  let documentTitle = 'demo';
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle += ` - ${path.meta.title}`;
    }
  });
  document.title = documentTitle;
});
export default router;
