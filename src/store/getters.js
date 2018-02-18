export const popular = state => state.popular || [];

export const currencies = state => state.currencies || [];

export const assets = state => state.assets || [];

export const articles = state => state.articles || [];

export const tracked = state => state.tracked || [];

export const trackedCurrencyIds = state => state.trackedCurrencyIds || [];

export const appConfig = state => state.appConfig;

export const valuationSettings = state => state.valuationSettings;

export const presets = state => state.presets || [];

export const localCurrencies = state => state.localCurrencies;

export const user = state => state.user;

export const token = state => state.token;

export const authenticated = state => !!state.user && !!state.token;

export const localCurrency = (state) => {
  const u = state.user || JSON.parse(localStorage.getItem('user')) || {};
  return state.localCurrencies.find(c => c.name === u.localCurrency) || state.localCurrencies[0];
};

export const remainingValuationWeight = state => 100 - state.valuationSettings
  .reduce((accumulator, valuation) => accumulator + parseFloat(valuation.weight), 0);

export const remainingPresets = state => state.presets
  .filter(p => !state.valuationSettings.find(v => v.name === p.name));
