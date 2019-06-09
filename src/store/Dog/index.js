import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
  roleId: 1,
  bookSession: false,
  bookEvent: false,
  updateAvailability: false,
  scheduleEvent: false,
  makeNewCategory: false,
  liveEvents: null,
  enrolledEvents: null
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
