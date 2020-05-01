import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/apps",
    name: "Apps",
    component: () => import(/* webpackChunkName: "apps" */ "../views/Apps.vue")
  },
  {
    path: "/amino-counter",
    name: "Amino Counter",
    component: () => import(/* webpackChunkName: "amino-counter" */ "../views/AminoCounter.vue")
  },
  {
    path: "/phe-calculator",
    name: "Phe Calculator",
    component: () => import(/* webpackChunkName: "phe-calculator" */ "../views/PheCalculator.vue")
  },
  {
    path: "/phe-search",
    name: "Phe Search",
    component: () => import(/* webpackChunkName: "phe-search" */ "../views/PheSearch.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
