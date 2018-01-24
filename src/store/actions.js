import Axios from 'axios';

const hasErrorMessage = function (e) {
  return e.response && e.response.data && e.response.data.message;
};

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

export const updateValuationSetting = async ({ commit }, payload) => {
  try {
    const response = await Axios.put(`/valuation-settings/${payload.id}`, payload);
    commit('updateValuationSetting', response.data);
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

export const fetchTrackedCurrencyIds = async ({ commit }) => {
  try {
    const response = await Axios.get('/tracked/ids');
    commit('trackedCurrencyIds', response.data);
  } catch (e) {
    // Handle errors
  }
};

export const fetchTracked = async ({ commit }) => {
  try {
    const response = await Axios.get('/tracked');
    commit('tracked', response.data);
  } catch (e) {
    // Handle errors
  }
};

// eslint-disable-next-line no-unused-vars
export const track = async ({ commit }, payload) => {
  try {
    await Axios.post('/tracked', payload);
  } catch (e) {
    if (hasErrorMessage(e)) {
      throw new Error(e.response.data.message);
    }
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
export const untrack = async ({ commit }, payload) => {
  try {
    await Axios.delete(`/tracked/${payload.symbol}`);
  } catch (e) {
    if (hasErrorMessage(e)) {
      throw new Error(e.response.data.message);
    }
    throw e;
  }
};

export const hightLightTrackedCoinsMenu = ({ commit }) => {
  commit('menuTrackedCoinsHighlight', true);
  setTimeout(function () {
    commit('menuTrackedCoinsHighlight', false);
  }, 2500);
};

export const updateValuation = async ({ commit }, payload) => {
  try {
    await Axios.put(`/valuations/${payload.valuation.id}`, { value: payload.value });
    commit('updateValuation', {
      trackedCurrency: payload.trackedCurrency,
      valuationId: payload.valuation.id,
      value: payload.value,
    });
  } catch (e) {
    if (hasErrorMessage(e)) {
      throw new Error(e.response.data.message);
    }
    throw e;
  }
};
