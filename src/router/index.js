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
    path: "/barcode-scanner",
    name: "Barcode Scanner",
    component: () => import(/* webpackChunkName: "barcode-scanner" */ "../views/BarcodeScanner.vue")
  },
  {
    path: "/own-food",
    name: "Own Food",
    component: () => import(/* webpackChunkName: "own-food" */ "../views/OwnFood.vue")
  },
  {
    path: "/phe-diary",
    name: "Phe Diary",
    component: () => import(/* webpackChunkName: "phe-diary" */ "../views/PheDiary.vue")
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import(/* webpackChunkName: "statistics" */ "../views/Statistics.vue")
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
    path: "/email-auth",
    name: "Email Auth",
    component: () => import(/* webpackChunkName: "email-auth" */ "../views/EmailAuth.vue")
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
