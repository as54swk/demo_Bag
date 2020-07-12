import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13982407 = () => interopDefault(import('..\\pages\\air\\index.vue' /* webpackChunkName: "pages_air_index" */))
const _fdf470c6 = () => interopDefault(import('..\\pages\\hotel\\index.vue' /* webpackChunkName: "pages_hotel_index" */))
const _2b1f81a6 = () => interopDefault(import('..\\pages\\map.vue' /* webpackChunkName: "pages_map" */))
const _05ff7683 = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages_post_index" */))
const _7687dd10 = () => interopDefault(import('..\\pages\\air\\flights.vue' /* webpackChunkName: "pages_air_flights" */))
const _2c62e483 = () => interopDefault(import('..\\pages\\air\\order.vue' /* webpackChunkName: "pages_air_order" */))
const _2be8941d = () => interopDefault(import('..\\pages\\air\\pay.vue' /* webpackChunkName: "pages_air_pay" */))
const _044ca4e2 = () => interopDefault(import('..\\pages\\user\\login.vue' /* webpackChunkName: "pages_user_login" */))
const _3072a53a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/air",
    component: _13982407,
    name: "air"
  }, {
    path: "/hotel",
    component: _fdf470c6,
    name: "hotel"
  }, {
    path: "/map",
    component: _2b1f81a6,
    name: "map"
  }, {
    path: "/post",
    component: _05ff7683,
    name: "post"
  }, {
    path: "/air/flights",
    component: _7687dd10,
    name: "air-flights"
  }, {
    path: "/air/order",
    component: _2c62e483,
    name: "air-order"
  }, {
    path: "/air/pay",
    component: _2be8941d,
    name: "air-pay"
  }, {
    path: "/user/login",
    component: _044ca4e2,
    name: "user-login"
  }, {
    path: "/",
    component: _3072a53a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
