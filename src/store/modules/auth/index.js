import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state() {
    return {
      userId: null,
      token: null
    };
  },
  getters,
  actions,
  mutations
};
