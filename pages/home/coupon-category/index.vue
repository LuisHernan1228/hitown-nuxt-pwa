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

      <b-navbar-brand class="mx-auto"> Coupons </b-navbar-brand>
      <b-navbar-brand> </b-navbar-brand>
    </b-navbar>

    <b-container class="bg-white" style="flex: 1">
      <div v-for="(categoryItem, index) in categoryList" v-bind:key="index">
        <HWCoCategoryItem
          :title="categoryItem.title"
          :subtitle="categoryItem.subtitle"
          :imgUrl="categoryItem.imgUrl"
          @onOpen="onGetSubcategory(categoryItem.id)"
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
  created() {
    this.transitionName = 'slide-left'
  },
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
      categoryList: (state) => state.app.categoryList,
    }),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.loginByToken().then((res) => {
        if (res) this.onInitCategory()
        else {
          localStorage.setItem('latestRoute', this.$router.currentRoute.path)
          this.$router.push('/auth/login')
        }
      })
    } else {
      this.onInitCategory()
    }
  },
  methods: {
    ...mapActions({
      loginByToken: 'auth/loginByToken',
      getCategoryList: 'app/getCategoryList',
      getSubcategoryList: 'app/getSubcategoryList',
    }),
    onInitCategory() {
        this.getCategoryList()
    },
    onGetSubcategory(categoryId) {
      this.$router.push(this.$router.currentRoute.path + '/' + categoryId)
    },
    onBack() {
      this.$router.push('/home')
    },
  },
}
</script>
