import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
Vue.use(Meta);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/phe-search",
    name: "Phe Search",
    component: () => import(/* webpackChunkName: "phe-search" */ "../views/PheSearch.vue")
  },
  {
    path: "/phe-calculator",
    name: "Phe Calculator",
    component: () => import(/* webpackChunkName: "phe-calculator" */ "../views/PheCalculator.vue")
  },
  {
    path: "/protein-calculator",
    name: "Protein Calculator",
    component: () => import(/* webpackChunkName: "protein-calculator" */ "../views/ProteinCalculator.vue")
  },
  {
    path: "/own-food",
    name: "Own Food",
    component: () => import(/* webpackChunkName: "own-food" */ "../views/OwnFood.vue")
  },
  {
    path: "/phe-log",
    name: "Phe Log",
    component: () => import(/* webpackChunkName: "phe-log" */ "../views/PheLog.vue")
  },
  {
    path: "/phe-diary",
    name: "Phe Diary",
    component: () => import(/* webpackChunkName: "phe-diary" */ "../views/PheDiary.vue")
  },
  {
    path: "/amino-counter",
    name: "Amino Counter",
    component: () => import(/* webpackChunkName: "amino-counter" */ "../views/AminoCounter.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
  {
    path: "/help",
    name: "Help",
    component: () => import(/* webpackChunkName: "help" */ "../views/Help.vue")
  },
  {
    path: "/other-apps",
    name: "Other Apps",
    component: () => import(/* webpackChunkName: "other-apps" */ "../views/OtherApps.vue")
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
    path: "/disclaimer",
    name: "Disclaimer",
    component: () => import(/* webpackChunkName: "disclaimer" */ "../views/Disclaimer.vue")
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    component: () => import(/* webpackChunkName: "privacy-policy" */ "../views/PrivacyPolicy.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
