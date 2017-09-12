import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Dashboard
import Dashboard from '@/views/Dashboard'

// Icons
import FontAwesome from '@/views/icons/FontAwesome.vue'
import SimpleLineIcons from '@/views/icons/SimpleLineIcons.vue'

// Tools
import Codec from '@/views/tools/Codec.vue'
import QRCode from '@/views/tools/QRCode.vue'

// Drag
import Drag from '@/views/drag/Drag.vue'

// UI-Dev
import UIDev from '@/views/uidev/UIDev.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      name: 'Home',
      components: {
        default: Full
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }, {
          path: 'tools',
          redirect: '/admin/tools/codec',
          name: 'Tools',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'codec',
              name: 'Codec',
              component: Codec
            }, {
              path: 'qr',
              name: 'QRCode',
              component: QRCode
            }
          ]
        }, {
          path: 'icons',
          redirect: '/admin/icons/fa',
          name: 'Icons',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'fa',
              name: 'Font Awesome',
              component: FontAwesome
            }, {
              path: 'simpleline',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        }, {
          path: 'drag',
          // redirect: '/drag/font-awesome',
          name: 'Drag',
          component: Drag
        }, {
          path: 'uidev',
          // redirect: '/drag/font-awesome',
          name: 'UI-Dev',
          component: UIDev
        }
      ]
    }
  ]
})
