export const currencies = state => state.currencies || [];

export const assets = state => state.assets || [];

export const tracked = state => state.tracked || [];

export const trackedCurrencyIds = state => state.trackedCurrencyIds || [];

export const appConfig = state => state.appConfig;

export const valuationSettings = state => state.valuationSettings;

export const localCurrencies = state => state.localCurrencies;

export const user = state => state.user || JSON.parse(localStorage.getItem('user'));

export const token = state => state.token || localStorage.getItem('token');

export const localCurrency = (state) => {
  const u = state.user || JSON.parse(localStorage.getItem('user')) || {};
  return state.localCurrencies.find(c => c.name === u.localCurrency) || state.localCurrencies[0];
};
