export default {
  userId(state) {
    return state.userId;
  },

  token(state) {
    return state.token;
  },

  isVerification(state) {
    return !!state.token;
  }
};
