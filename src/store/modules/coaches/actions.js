export default {
  registerCoach(context, payload) {
    const data = {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    context.commit('registerCoach', data);
  }
};
