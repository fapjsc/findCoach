let timer;

export default {
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },

  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUfu7TjRWMMupkICIUhk1Kc03S2J67XlA';

    if (mode == 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUfu7TjRWMMupkICIUhk1Kc03S2J67XlA`;
    }

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.error.message || 'Failed to signup');
      throw error;
    }

    // const expirseStamp = +resData.expiresIn * 1000;
    const expirseStamp = 10000;

    const expiresDate = new Date().getTime() + expirseStamp;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpirse', expiresDate);

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expirseStamp);

    context.commit('setUser', {
      userId: resData.localId,
      token: resData.idToken
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiresDate = localStorage.getItem('tokenExpirse');

    const expiresIn = expiresDate - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpirse');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  }
};
