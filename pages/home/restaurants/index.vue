<template>
  <div>
    <b-navbar sticky type="dark" variant="dark">
      <NuxtLink to="/home">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #fff"
        ></b-icon>
      </NuxtLink>

      <b-navbar-brand class="ml-3" href="#"> Restaurant List </b-navbar-brand>
    </b-navbar>

    <b-container>
      <div v-for="(restItem, index) in restList" v-bind:key="index">
        <HWRestItem
          :name="restItem.name"
          :imgUrl="restItem.imgUrl"
          @onClick="onOpenRest(restItem.id, restItem.siteUrl)"
        />
      </div>
      <!-- <b-navbar fixed="bottom" class="text-white" type="light" variant="dark">
        <small> © HiTown 2022</small>
      </b-navbar> -->
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HWRestItem from '@/components/HWRestItem.vue'
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
    HWRestItem,
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
      restList: (state) => state.rest.restList,
    }),
  },
  mounted() {
    this.getRestList()
  },
  methods: {
    ...mapActions({
      getRestList: 'rest/getRestList',
      openRest: 'rest/openRest',
      logout: 'auth/logout',
    }),
    onOpenRest(id, siteUrl) {
      this.openRest({ id, siteUrl })
    },
  },
}
</script>
<style>
.restaurant-page a.back-link {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
</style>
