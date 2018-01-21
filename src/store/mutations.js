export const currencies = (state, payload) => {
  state.currencies = payload;
};

export const valuationSettings = (state, payload) => {
  state.valuationSettings = payload;
};

export const addValuationSetting = (state, payload) => {
  state.valuationSettings.push(payload);
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
