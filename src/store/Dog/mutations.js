export default {
  setRoleId(state, payload){
    state.roleId = payload
  },
  setBookSession(state, payload){
    state.bookSession = payload
  },
  setBookEvent(state, payload){
    state.bookEvent = payload
  },
  setUpdateAvailability(state, payload){
    state.updateAvailability = payload
  },
  setScheduleEvent(state, payload){
    state.scheduleEvent = payload
  },
  setNewCategory(state, payload){
    state.makeNewCategory = payload
  },
  setLiveEvents(state, payload){
    state.liveEvents = payload
  },
  setEnrolledEvents(state, payload){
    state.enrolledEvents = payload
  }
}
