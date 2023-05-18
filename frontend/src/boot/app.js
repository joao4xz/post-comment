import { anonymousRouter, routes } from 'boot/pages'
import { Dialog, Notify } from 'quasar'

export function notify (params) {
  const opts = { ...params, html: true }
  if (params.type === 'negative') {
    opts.timeout = 10000
  }
  return Notify.create(opts)
}

export const loading = {
  active: false,
  show (self) {
    if (this.active) return
    this.active = true
    self.$q.loading.show()
  },
  hide (self) {
    this.active = false
    self.$q.loading.hide()
  }
}

export function confirm (message, okCb, cancelCb) {
  Dialog.create({
    message,
    html: true,
    ok: 'Sim',
    cancel: 'Nao',
    focus: 'cancel',
    persistent: true,
    title: 'Confirmação'
  }).onOk(() => okCb())
    .onCancel(() => cancelCb ? cancelCb() : null)
}

export default ({ app }) => {
  anonymousRouter.push('/login')

  routes.push([
    {
      path: '/login',
      component: () => import('pages/login/Login.vue')
    }
  ])
}
