export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const registerdata = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    const res = await fetch(
      `https://findcoach-6205f-default-rtdb.firebaseio.com//coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(registerdata)
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Failed to register');
      throw error;
    }

    context.commit('registerCoach', {
      ...registerdata,
      id: userId
    });
  },

  async loadCoaches(context, payload) {
    if (!context.getters.shouldUpdate && !payload.forceRefresh) {
      return;
    }
    const res = await fetch(
      `https://findcoach-6205f-default-rtdb.firebaseio.com//coaches.json`
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Failed coaches to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        areas: data[key].areas,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
