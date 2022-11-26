<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <b-navbar sticky type="dark" variant="dark">
      <b-navbar-nav left>
        <NuxtLink to="/home/coupon-category">
          <b-icon
            font-scale="1.5"
            icon="arrow-left-circle-fill"
            style="color: #fff"
          ></b-icon>
        </NuxtLink>
      </b-navbar-nav>

      <b-navbar-brand class="mx-auto"> Coupons </b-navbar-brand>
      <!-- <b-navbar-brand class="ml-3" href="#"> {{categoryItem.title}} </b-navbar-brand> -->
      <!-- <span class="ml-3 fs-1 section-blade-text" > {{categoryItem.title}} </span> -->
      <b-navbar-brand> </b-navbar-brand>
    </b-navbar>

    <b-navbar type="dark" sticky variant="warning">
      <b-navbar-brand class="mx-auto font-weight-bold" href="#">
        {{ categoryItem.title }}
      </b-navbar-brand>
    </b-navbar>

    <b-container class="bg-white" style="flex: 1">
      <div
        v-for="(subcategoryItem, index) in subcategoryList"
        v-bind:key="index"
      >
        <HWCoCategoryItem
          :title="subcategoryItem.title"
          :subtitle="subcategoryItem.subtitle"
          :imgUrl="subcategoryItem.imgUrl"
          @onOpen="onGetCoupons(subcategoryItem.id)"
        />
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import HWCoCategoryItem from '@/components/HWCoCategoryItem.vue'
export default {
  transition(to, from) {
    if (!from) return 'slide-left'
    if (to.path.split('/').length > from.path.split('/').length)
      return 'slide-left'
    if (to.path.split('/').length < from.path.split('/').length)
      return 'slide-right'
  },
  components: {
    HWCoCategoryItem,
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
      subcategoryList: (state) => state.app.subcategoryList,
      categoryItem: (state) => state.app.categoryItem,
    }),
  },
  mounted() {
    const path = this.$router.currentRoute.path
    if (!this.isAuthenticated) {
      this.loginByToken().then((res) => {
        if (res) this.onInitSubcategory(path.split('/').reverse()[0])
        else {
          localStorage.setItem('latestRoute', this.$router.currentRoute.path)
          this.$router.push('/auth/login')
        }
      })
    } else this.onInitSubcategory(path.split('/').reverse()[0])
  },
  methods: {
    ...mapActions({
      loginByToken: 'auth/loginByToken',
      getSubcategoryList: 'app/getSubcategoryList',
      getCouponList: 'app/getCouponList',
    }),
    onInitSubcategory(categoryId) {
        this.getSubcategoryList(categoryId)
    },
    onGetCoupons(subcategoryId) {
      this.$router.push(this.$router.currentRoute.path + '/' + subcategoryId)
    },
  },
}
</script>
