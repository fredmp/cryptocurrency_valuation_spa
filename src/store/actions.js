import Axios from 'axios';

export const fetchCurrencies = async ({ commit }) => {
  try {
    const response = await Axios.get('/currencies');
    commit('currencies', response.data);
  } catch (e) {
    // Handle errors
  }
};

export const fetchValuationSettings = async ({ commit }) => {
  try {
    const response = await Axios.get('/valuation-settings');
    commit('valuationSettings', response.data);
  } catch (e) {
    // Handle errors
  }
};

export const addValuationSetting = async ({ commit }, payload) => {
  try {
    const response = await Axios.post('/valuation-settings', payload);
    commit('addValuationSetting', response.data);
  } catch (e) {
    // Handle errors
  }
};

export const removeValuationSetting = async ({ commit }, payload) => {
  try {
    await Axios.delete(`/valuation-settings/${payload}`);
    commit('removeValuationSetting', payload);
  } catch (e) {
    // Handle errors
  }
};
