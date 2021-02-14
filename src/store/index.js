import { createStore } from 'vuex';
import coachModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestsModule
  },
  state() {
    return {
      userId: 'c1'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
