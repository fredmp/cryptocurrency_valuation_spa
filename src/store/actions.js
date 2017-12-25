import Axios from 'axios'

export const fetchCurrencies = ({ commit }) => {
  Axios.get('/currencies').then(function (response) {
    commit('currencies', response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const fetchValuationSettings = ({ commit }) => {
  Axios.get('/valuation-settings').then(function (response) {
    commit('valuationSettings', response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const addValuationSetting = ({ commit }, payload) => {
  Axios.post('/valuation-settings', payload).then(function (response) {
    commit('addValuationSetting', response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const removeValuationSetting = ({ commit }, payload) => {
  Axios.delete(`/valuation-settings/${payload}`).then(function () {
    commit('removeValuationSetting', payload)
  }).catch(function (error) {
    console.log(error)
  })
}
