export default {
  async contactCoach(context, payload) {
    const coachId = payload.coachId;
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };

    const res = await fetch(
      `https://findcoach-6205f-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Failed to send request');
      throw error;
    }

    console.log(data);

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const res = await fetch(
      `https://findcoach-6205f-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch requests');
      throw error;
    }

    const requests = [];

    for (const key in resData) {
      const request = {
        id: key,
        message: resData[key].message,
        userEmail: resData[key].userEmail,
        coachId: coachId
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
