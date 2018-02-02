export const currencies = (state, payload) => {
  state.currencies = payload;
};

export const tracked = (state, payload) => {
  state.tracked = payload;
};

export const trackedCurrencyIds = (state, payload) => {
  state.trackedCurrencyIds = payload;
};

export const valuationSettings = (state, payload) => {
  state.valuationSettings = payload;
};

export const addValuationSetting = (state, payload) => {
  state.valuationSettings.push(payload);
};

export const addValuationSettings = (state, newValuationSettings) => {
  newValuationSettings.forEach(v => state.valuationSettings.push(v));
};

export const updateValuationSetting = (state, { id, name, description, maxValue, weight }) => {
  const valuation = state.valuationSettings.find(v => v.id === id);
  if (valuation) {
    valuation.name = name;
    valuation.description = description;
    valuation.maxValue = maxValue;
    valuation.weight = weight;
  }
};

export const removeValuationSetting = (state, payload) => {
  state.valuationSettings = state.valuationSettings.filter(e => e.id !== payload);
};

export const menuTrackedCoinsHighlight = (state, payload) => {
  state.appConfig.menuTrackedCoinsHighlight = payload;
  state.appConfig = JSON.parse(JSON.stringify(state.appConfig));
};

export const updateValuation = (state, { trackedCurrency, valuationId, value }) => {
  const valuation = trackedCurrency.valuations.find(v => v.id === valuationId);
  if (valuation) {
    valuation.value = value;
  }
};

export const assets = (state, payload) => {
  state.assets = payload;
};

export const setUser = (state, user) => {
  state.user = user;
  localStorage.setItem('user', JSON.stringify(user));
};

export const setToken = (state, token) => {
  state.token = token;
  localStorage.setItem('token', token);
};

export const unsetUser = (state) => {
  state.user = null;
  localStorage.removeItem('user');
};

export const unsetToken = (state) => {
  state.token = null;
  localStorage.removeItem('token');
};
