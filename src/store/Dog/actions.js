
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
  GET_ALL_BREEDS({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('https://dog.ceo/api/breeds/list/all')
        .then(_response => {
          let allBreeds = []
          let breedKeys = Object.keys(_response.data.message)
          for (let i in breedKeys) {
            allBreeds.push({ key: breedKeys[i], value: breedKeys[i], text: breedKeys[i] })
          }
          resolve(allBreeds)
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
