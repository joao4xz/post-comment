import { securityStore } from 'stores/security'

export const anonymousRouter = []
export const routes = {
  routes: [],
  push (routes) {
    if (routes instanceof Array) {
      this.routes.push(...routes)
      return
    }
    this.routes.push(routes)
  },
  replace (newRoute) {
    const index = this.routes.findIndex(r => r.path === newRoute.path)
    if (index > -1) {
      this.routes[index] = newRoute
    }
  },
  addRoute (router) {
    this.routes.forEach(route => (router.addRoute(route)))
  }
}

export default ({ app, router }) => {
  router.beforeEach((to, from, next) => {
    const [path] = (to.fullPath || '').split('?')
    if (anonymousRouter.includes(path)) {
      return next()
    }
    const store = securityStore()
    const { token } = store.auth
    if (token) {
      return next()
    }
    return next('/login')
  })
  routes.addRoute(router)
}
