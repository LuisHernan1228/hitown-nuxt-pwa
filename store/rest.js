export const state = () => ({
  restList: [],
  siteUrl: '',
});

export const getters = () => ({
  filteredRest(state) {
    return state.restList
  }
});

export const mutations = {
  SET_RESTLIST(state, data) {
    state.restList = data
  },
  SET_SITEURL(state, siteUrl) {
    state.siteUrl = siteUrl
  }
};

export const actions = {
  async getRestList({ commit }) {
    const result = await this.$axios.$get('/restaurants/all')
    if(result. status && result.data) {
      console.log("restList api: ", result.data);
      commit("SET_RESTLIST", result.data);
      this.$router.push('/home/restaurants');
    }
  },
  openRest({commit}, restData) {
    const {id, siteUrl} = restData;
    commit("SET_SITEURL", siteUrl);
    this.$router.push('/home/restaurants/' + id);
  }
};
