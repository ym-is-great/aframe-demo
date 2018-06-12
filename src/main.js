import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('@/views/Index') },
    { path: '/hello-world', component: () => import('@/views/HelloWorld') },
    { path: '/panorama', component: () => import('@/views/Panorama') },
    { path: '/demo', component: () => import('@/views/Demo') }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
