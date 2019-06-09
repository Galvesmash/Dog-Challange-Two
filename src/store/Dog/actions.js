
import axios from 'axios'

export default {
  GET_RANDOM_IMAGE({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://dog.ceo/api/breeds/image/random')
        .then(_response => {
          resolve(_response.data.message)
        })
        .catch(_error => {
          reject(_error.message)
        })
    })
  },
  POST_EXAMPLE({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      axios.post('url', _payload)
        .then(_response => {
          resolve(_response.data.message)
        })
        .catch(_error => {
          reject(_error.message)
        })
    })
  }
}
