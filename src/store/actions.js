import Axios from 'axios'

export const value = ({ commit }, payload) => {
  setTimeout(() => {
    commit('value', payload)
  }, 500)
}

export const fetchCurrencies = ({ commit }) => {
  Axios.get('/currencies').then(function (response) {
    commit('currencies', response.data)
  }).catch(function (error) {
    console.log(error)
  })
}
