export default {
  async signup(context, payload) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUfu7TjRWMMupkICIUhk1Kc03S2J67XlA`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData);
      const error = new Error(resData.error.message || 'Failed to signup');
      throw error;
    }

    console.log(resData);

    context.commit('setUser', {
      userId: resData.localId,
      token: resData.idToken,
      expiresIn: resData.expiresIn
    });
  }
};
