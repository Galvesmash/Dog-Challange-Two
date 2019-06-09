
import axios from 'axios'

export default {
  GET_RANDOM_IMAGE({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://dog.ceo/api/breeds/image/random')
        .then(_response => {
          resolve(_response.data.message)
        })
        .catch(_error => {
          reject(_error.response.data.message)
        })
    })
  },
  SEARCH_DOG({ commit }, _payload) {
    return new Promise((resolve, reject) => {
      axios.get(`https://dog.ceo/api/breed/${_payload.search}/images/random`)
        .then(_response => {
          resolve(_response.data.message)
        })
        .catch(_error => {
          reject(_error.response.data.message)
        })
    })
  },
}
