export const value = ({ commit }, payload) => {
  setTimeout(() => {
    commit('value', payload)
  }, 500)
}

export const fetchCities = ({ commit }) => {
  // Fetch from service instead of hardcode
  const cities = [
    { name: 'Arraial do Cabo', numberOfJobs: 8 },
    { name: 'Cabo Frio', numberOfJobs: 20 },
    { name: 'Búzios', numberOfJobs: 2 },
    { name: 'São Pedro', numberOfJobs: 14 }
  ]
  commit('cities', cities)
}
