// mport Vuex from 'vuex';

export const state = () => ({
  navigation: [],
  posts: {},
});

export const mutations = {
  SET_NAVIGATION(newState, navigation) {
    // eslint-disable-next-line
    newState.navigation = navigation;
  },
  SET_POST_ALL(newState, { industrial, visual }) {
    if (newState.posts) {
      if (industrial) {
        // eslint-disable-next-line
        newState.posts.industrial = industrial;
      }
      if (visual) {
        // eslint-disable-next-line
        newState.posts.visual = visual;
      }
    } else {
      // eslint-disable-next-line
      newState.posts = { visual, industrial };
    }
  },
};

export const actions = {
  setNavigation({ commit }, data) {
    commit('SET_NAVIGATION', data);
  },
  setPostAll({ commit }, data) {
    commit('SET_POST_ALL', data);
  },
};

export const getters = {
  getNavigation: s => () => s.navigation,
  getPostAll: s => () => s.posts,
};
