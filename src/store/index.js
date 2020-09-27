export const state = () => ({
  counter: 0,
});

export const mutations = {
  increment(newState) {
    // eslint-disable-next-line
    newState.counter += 1;
  },
};
