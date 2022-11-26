export const state = () => ({
  categoryList: [],
  subcategoryList: [],
  categoryItem: {},
  subcategoryItem: {},

  coupon: {},
  couponList: [],

  errStr: '',
  successStr: '',
});
  
export const getters = () => ({
  filteredCoupons(state) {
    return state.couponList
  }
});
  
export const mutations = {
  SET_MSG(state, msgInfo) {
    const {kind, msg} = msgInfo
    if(kind === 'errStr')
      state.errStr = msg;
    else if(kind === 'success')
      state.successStr = msg;
  },
  SET_CATEGORYLIST(state, data) {
    state.categoryList = data;
  },
  SET_CATEGORYITEM(state, data) {
    state.categoryItem = data;
  },
  SET_SUBCATEGORYLIST(state, data) {
    const { categoryItem, subcategoryList } = data;
    state.subcategoryList = subcategoryList;
    state.categoryItem = categoryItem;
  },
  SET_SUBCATEGORYITEM(state, data) {
    state.subcategoryItem = data;
  },
  ADD_COUPON(state, coupon) {
    state.couponList.push(coupon)
  },
  SET_COUPONLIST(state, data) {
    const { couponList, subcategoryItem } = data;
    state.couponList = couponList;
    state.subcategoryItem = subcategoryItem;
  },
  SET_COUPON(state, coupon) {
    state.coupon = coupon
  },
};
  
export const actions = {
  async getCategoryList({ commit }) {
    try {
      const result = await this.$axios.$get('/coupon-category/all')
      
      if(result.status && result.data) {
        commit("SET_CATEGORYLIST", result.data)
        this.$router.push('/home/coupon-category');
      }
      else
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async getSubcategoryList({ commit }, categoryId) {
    try {
      const listResult = await this.$axios.$get('/coupon-subcategory/list/' + categoryId)
      const itemResult = await this.$axios.$get('/coupon-category/item/' + categoryId)
      
      if(listResult.status && listResult.data && itemResult.status && itemResult.data) {
        commit("SET_SUBCATEGORYLIST", { subcategoryList: listResult.data, categoryItem: itemResult.data })
        this.$router.push('/home/coupon-category/' + categoryId);  
      } else
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },

  async addCoupon({ commit }, coupon) {
    try {
      const result = await this.$axios.$post('/coupons/add', coupon)

      if(result.status && result.data.id) {
        const data = {...result.data, validate: false }
        commit("ADD_COUPON", data)
        return true
      } else {
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
        return false
      }
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async getCouponList({ commit }, subcategoryId) {
    try {
      const listResult = await this.$axios.$get('/coupons/list/' + subcategoryId)
      const itemResult = await this.$axios.$get('/coupon-subcategory/item/' + subcategoryId)

      if(listResult.status && listResult.data && itemResult.status && itemResult.data) {
        commit("SET_COUPONLIST", { couponList: listResult.data, subcategoryItem: itemResult.data });
        if(this.$router.currentRoute.path.split('/').length <= 4)
          this.$router.push(this.$router.currentRoute.path + '/' + subcategoryId);
      } else
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },
  async getCouponItem({ commit }, id) {
    try {
      const result = await this.$axios.$get('/coupons/item/' + id )

      if(result.status && result.data.id) {
        commit("SET_COUPON", result.data)
        if(this.$router.currentRoute.path.split('/').length <= 5)
          this.$router.push(this.$router.currentRoute.path + '/' + id)
      } else {
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
      }
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  },

  async putValidate({ commit }, data) {
    try {
      const result = await this.$axios.$post('/user-coupons/add', data)
      
      if(result.status && result.data)
        return true
      else {
        commit("SET_MSG", { kind: 'errStr', msg: 'Request Failed' });
        return false
      }
    } catch (err) {
      console.log("login request: ", err);
      commit("SET_MSG", { kind: 'errStr', msg: 'Network Error' });
    }
  }
};
