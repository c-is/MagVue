import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6a20bb59 = () => interopDefault(import('../src/pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _538d2886 = () => interopDefault(import('../src/pages/coming-soon/index.vue' /* webpackChunkName: "pages/coming-soon/index" */))
const _2b6512c2 = () => interopDefault(import('../src/pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _868b0f20 = () => interopDefault(import('../src/pages/industrial/index.vue' /* webpackChunkName: "pages/industrial/index" */))
const _72bc4e77 = () => interopDefault(import('../src/pages/visual/index.vue' /* webpackChunkName: "pages/visual/index" */))
const _73a0e73c = () => interopDefault(import('../src/pages/blog/post.ts' /* webpackChunkName: "pages/blog/post" */))
const _686a1a11 = () => interopDefault(import('../src/pages/blog/_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _7105ad2f = () => interopDefault(import('../src/pages/visual/_slug.vue' /* webpackChunkName: "pages/visual/_slug" */))
const _240cd9ce = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/blog",
    component: _6a20bb59,
    name: "blog"
  }, {
    path: "/coming-soon",
    component: _538d2886,
    name: "coming-soon"
  }, {
    path: "/contact",
    component: _2b6512c2,
    name: "contact"
  }, {
    path: "/industrial",
    component: _868b0f20,
    name: "industrial"
  }, {
    path: "/visual",
    component: _72bc4e77,
    name: "visual"
  }, {
    path: "/blog/post",
    component: _73a0e73c,
    name: "blog/post"
  }, {
    path: "/blog/:slug",
    component: _686a1a11,
    name: "blog/slug"
  }, {
    path: "/visual/:slug",
    component: _7105ad2f,
    name: "visual/slug"
  }, {
    path: "/",
    component: _240cd9ce,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
