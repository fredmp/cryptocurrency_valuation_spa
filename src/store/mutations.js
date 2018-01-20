export const currencies = (state, payload) => {
  state.currencies = payload;
};

export const valuationSettings = (state, payload) => {
  state.valuationSettings = payload;
};

export const addValuationSetting = (state, payload) => {
  state.valuationSettings.push(payload);
};

export const removeValuationSetting = (state, payload) => {
  state.valuationSettings = state.valuationSettings.filter(e => e.id !== payload);
};
