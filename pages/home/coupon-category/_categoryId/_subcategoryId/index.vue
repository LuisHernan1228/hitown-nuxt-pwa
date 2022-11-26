<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <b-navbar sticky type="dark" variant="dark">
      <div @click="onBack">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #fff"
        ></b-icon>
      </div>

      <b-navbar-brand class="mx-auto" href="#"> Coupons </b-navbar-brand>
      <b-navbar-brand> </b-navbar-brand>
    </b-navbar>
    <b-navbar type="dark" sticky variant="warning">
      <b-navbar-brand class="mx-auto font-weight-bold" href="#">
        {{ subcategoryItem.title }}
      </b-navbar-brand>
    </b-navbar>

    <b-container class="bg-white" style="flex: 1">
      <!-- <div class="row mb-0">
            <div class="md-col-4 col-6 pe-1">
              <a
                data-menu="menu-follow"
                class="btn btn-m btn-full mb-3 rounded-s text-uppercase font-900 shadow-s bg-blue-dark"
                @click="openAddModal"
                >Add Coupon</a
              >
            </div>
          </div> -->
      <div
        class="d-flex flex-column justify-content-center align-items-center pt-3"
      >
        <!-- <h2>{{ subcategoryItem.title }}</h2> -->
        <b-alert show variant="light">{{
          subcategoryItem.description
        }}</b-alert>
      </div>

      <div v-for="(couponItem, index) in allowedCoupons" v-bind:key="index">
        <CoCouponItem
          :title="couponItem.title"
          :validate="false"
          :imgUrl="couponItem.imgUrl"
          @onOpen="onOpenItem(couponItem.id)"
        />
      </div>

      <div v-for="(couponItem, index) in validatedCoupons" v-bind:key="index">
        <CoCouponItem
          :title="couponItem.title"
          :validate="true"
          :imgUrl="couponItem.imgUrl"
          @onOpen="onOpenItem(couponItem.id)"
        />
      </div>

      <!-- <AddCoupon
        :is-visible="addModal"
        @addCoupon="onAddCoupon"
        @closeModal="closeModal"
      /> -->
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import AddCoupon from '@/components/AddCoupon.vue'
import CoCouponItem from '@/components/CoCouponItem.vue'
// import HWLoginStatus from '@/components/HWLoginStatus.vue'
export default {
  transition(to, from) {
    if (!from) return 'slide-left'
    if (to.path.split('/').length > from.path.split('/').length)
      return 'slide-left'
    if (to.path.split('/').length < from.path.split('/').length)
      return 'slide-right'
  },
  components: {
    // AddCoupon,
    CoCouponItem,
    // HWLoginStatus,
  },
  data() {
    return {
      addModal: false,
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
      couponIds: (state) => state.auth.couponIds,
      couponList: (state) => state.app.couponList,
      subcategoryItem: (state) => state.app.subcategoryItem,
    }),
    allowedCoupons() {
      return this.couponList.filter((item) => !this.couponIds.includes(item.id))
    },
    validatedCoupons() {
      return this.couponList.filter((item) => this.couponIds.includes(item.id))
    },
  },
  mounted() {
    const path = this.$router.currentRoute.path
    if (!this.isAuthenticated) {
      this.loginByToken().then((res) => {
        if (res) this.onInitCouponList(path.split('/').reverse()[0])
        else {
          localStorage.setItem('latestRoute', this.$router.currentRoute.path)
          this.$router.push('/auth/login')
        }
      })
    } else this.onInitCouponList(path.split('/').reverse()[0])
  },
  methods: {
    ...mapActions({
      loginByToken: 'auth/loginByToken',
      logout: 'auth/logout',
      addCoupon: 'app/addCoupon',
      getCouponItem: 'app/getCouponItem',
      getCouponList: 'app/getCouponList',
    }),
    onBack() {
      const path = this.$router.currentRoute.path
      this.$router.push(path.split('/').reverse().slice(1).reverse().join('/'))
    },
    onInitCouponList(subcategoryId) {
      // if (!(this.couponList && this.couponList.length > 0))
        this.getCouponList(subcategoryId)
    },
    openAddModal() {
      this.addModal = true
    },
    closeModal() {
      this.addModal = false
    },
    async onAddCoupon(coupon) {
      const result = await this.addCoupon(coupon)
      if (result) {
        console.log('add coupon', coupon)
        this.addModal = false
      }
    },
    onOpenItem(id) {
      if (this.couponIds.includes(id)) return
      this.$router.push(this.$router.currentRoute.path + '/' + id)
    },
  },
}
</script>
