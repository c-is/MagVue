export const state = () => ({
  isMenuOpen: false,
  isMobile: false,
  isPageLoaded: false,
});

/* eslint-disable */
export const mutations = {
  SET_STATUS_MENU_OPEN(newState, value) {
    newState.isMenuOpen = value;
  },
  SET_IS_MOBILE(newState, value) {
    newState.isMobile = value;
  },
  SET_IS_PAGE_LOADED(newState, value) {
    newState.isPageLoaded = value;
  },
};
/* eslint-enable */

export const actions = {
  setStatusMenuOpen({ commit }, value) {
    commit('SET_STATUS_MENU_OPEN', value);
  },
  setIsMobile({ commit }, value) {
    commit('SET_IS_MOBILE', value);
  },
  setIsPageLoaded({ commit }, value) {
    commit('SET_IS_PAGE_LOADED', value);
  },
};

export const getters = {
  getStatusMenuOpen: s => () => s.isMenuOpen,
};
