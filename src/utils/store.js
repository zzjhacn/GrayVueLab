import Vue from 'vue'
import Vuex from 'vuex'
import components from '@/views/uidev/module'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    SHOW_MESSAGE(state, message) {
      state.message = message
    },
    RECEIVE_INSTANCE_DETAILS(state, instance) {
      state.message = 'Instance selected: ' + instance.name
    }
  },
  modules: {
    components
  }
})

export default store

if (module.hot) {
  module.hot.accept([
    '@/views/uidev/module'
  ], () => {
    try {
      store.hotUpdate({
        modules: {
          components: require('@/views/uidev/module').default
        }
      })
    } catch (e) {
      console.log(e.stack)
    }
  })
}
