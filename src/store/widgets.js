// mport Vuex from 'vuex';

export const state = () => ({
  cursor: {},
});

export const mutations = {
  add(newState, { instance, instanceKey }) {
    // eslint-disable-next-line
    newState[instanceKey] = instance;
  },
};

// export const actions = {
//   setInstance({ commit }, data) {
//     commit('SET_INSTANCE', data);
//   },
// };
