export const state = () => ({
    reqInfo: {},

    token: null,
    user: {},
    authStatus: false,

    couponIds: [],
    existUser: false,

    errStr: '',
    successStr: '',
});
 
export const getters = () => ({
    isAuthenticated: (state) => !state.token,
    authStatus: (state) => state.authStatus,
    user: (state) => state.user,
});
  
export const mutations = {
  SET_MSG(state, msgInfo) {
    const {kind, msg} = msgInfo
    if(kind === 'errStr')
      state.errStr = msg;
    else if(kind === 'success')
      state.successStr = msg;
  },
  SET_REQINFO(state, info) {
    state.reqInfo = info
  },
  SET_EXISTUSER(state, status) {
    state.existUser = status
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_COUPONS(state, couponIds) {
    state.couponIds = [...state.couponIds, ...couponIds];
  },
  LOGIN_USER(state, user) {
    state.authStatus = true;
    state.user = user;
  },
  LOGOUT_USER(state) {
    state.token = null;
    state.user = {};
    state.authStatus = false;
  },
  UPDATE_USER(state, user) {
    state.user = { ...state.user, ...user };
  }
}
  
export const actions = {
  async loginRequest({ commit }, authDetails) {
    try {
      const result = await this.$axios.$post('/auth/signin-req', authDetails);
      
      if(result.data && result.data.sid) {
        commit("SET_REQINFO", authDetails);
        commit("SET_EXISTUSER", result.data.exist);
        this.$router.push('/auth/verify');
      } else {
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
        // this.$router.push('/auth/register');
      }
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async loginByToken({ commit }) {
    try {
      const token = localStorage.getItem('accessToken')
      if(!token)
        return false
      const result = await this.$axios.$post('/auth/signin-token', { token });

      if(result.data && result.data.user) {
        const { couponIds, user: {token, ...userInfo}} = result.data;
        commit("SET_TOKEN", token);
        localStorage.setItem('accessToken', token);
        commit("LOGIN_USER", userInfo);
        commit("SET_COUPONS", couponIds);
        return true;
      } else
        return false;
    } catch (err) {
      console.log("loginByToken request err: ", err);
    }
  },
  async loginVerify({ commit }, data) {
    try {
      const {authDetails, exist} = data;
      const result = await this.$axios.$post('/auth/signin-verify', authDetails);
      
      if(result.data) {
        if(result.data.user) {
          const { couponIds, user: {token, ...userInfo}} = result.data;
          commit("SET_TOKEN", token);
          commit("LOGIN_USER", userInfo);
          commit("SET_COUPONS", couponIds);
  
          localStorage.setItem('accessToken', token);
          const latestRoute = localStorage.getItem('latestRoute');
          if(exist) {
            if(latestRoute) {
              this.$router.push(latestRoute);
              localStorage.setItem('latestRoute', '');
            } else
              this.$router.push('/');
          }
        } else if(result.data.validate && !exist)
          this.$router.push('/auth/register');
        else
          commit("SET_MSG", { kind: 'errStr', msg: 'Wrong Code' });
      } else
        commit("SET_MSG", { kind: 'errStr', msg: 'Wrong Code' });
    } catch (err) {
      console.log("login verify failed: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async resendRequest({commit}, authDetails) {
    try {
      const result = await this.$axios.$post('/auth/signin-req', authDetails);

      if(!(result.data && result.data.sid)) 
        commit("SET_MSG", { kind: 'errStr', msg: 'Failed resend' });
    } catch (err) {
      console.log("resend code failed: ", err );
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async register({ commit }, authDetails) {
    try {
      const result = await this.$axios.$post('/auth/register', authDetails)
      if(result.status) {
        if(result.data.id) {
          const { token, ...user} = result.data;
          commit("SET_TOKEN", token);
          commit("LOGIN_USER", user);
          localStorage.setItem('accessToken', token);

          const latestRoute = localStorage.getItem('latestRoute');
          if(latestRoute) {
            this.$router.push(latestRoute);
            localStorage.setItem('latestRoute', '');
          } else
            this.$router.push('/');
        } else {
          commit("SET_MSG", { kind: 'errStr', msg: result.data });
        }
      } else
        commit("SET_MSG", { kind: 'errStr', msg: 'Failed Register' })
    } catch (err) {
      console.log("register failed : ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  setMsg({ commit }, msgInfo) {
    commit("SET_MSG", msgInfo);
  },
  logout({ commit }) {
    localStorage.setItem('accessToken', '');
    commit("LOGOUT_USER");
  },
  goBack() {
    this.$router.go(-1) 
  },
  async updateProfile({commit}, userInfo) {
    try {
      const result = await this.$axios.$put('/users/user/' + userInfo.id, userInfo)
      if(result.status && result.data.id) {
        commit('UPDATE_USER', userInfo);
        this.$router.push('/home');
      } else
        commit("SET_MSG", { kind: 'errStr', msg: 'Failed Update' })
    } catch (err) {
      console.log("update profile failed : ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  }
};