import Vue from 'vue'
import Vuex from 'vuex'
import { Store, Helpers } from 'paas_admin/dist/paas_admin.umd'
import AppStore from '../store'

Vue.use(Vuex)

export default new Vuex.Store({
  ...Helpers.mergeDeep(AppStore, Store),
})
