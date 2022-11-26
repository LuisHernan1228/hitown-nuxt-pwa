<template>
  <div>
    <b-navbar sticky type="dark" variant="dark">
      <b-navbar-brand href="#" class="mx-auto"> </b-navbar-brand>
      <b-navbar-brand href="#" class="mx-auto">
        <!-- <img
          style="height: 28px"
          src="/images/photos/logo-hitown.png"
          alt="HiTown"
        /> -->
        <!-- <b-icon font-scale="1" icon="upc-scan" style="color: #fff"></b-icon> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-qr-code-scan"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"
          />
          <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
          <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
          <path
            d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"
          />
          <path d="M12 9h2V8h-2v1Z" />
        </svg>
        HiTown.us
      </b-navbar-brand>
      <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
        <!-- Navbar dropdowns -->

        <!-- <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            <i class="py-0 fa fa-check"></i>
            <b-icon
              font-scale="1.5"
              icon="person-fill"
              style="color: #fff"
            ></b-icon>
          </template>
          <b-dropdown-item
            ><NuxtLink to="/auth/profile">Profile</NuxtLink></b-dropdown-item
          >
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-brand v-else class="mx-auto"> </b-navbar-brand>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col class="" sm="6" lg="4" xl="3">
          <div class="section-blade sectionButton" @click="openRests">
            <b-img-lazy
              v-bind="mainProps"
              src="/images/photos/home_restaurants.jpg"
              alt="Image 1"
            ></b-img-lazy>

            <div
              class="section-blade-content d-flex justify-content-center align-items-center"
            >
              <span class="section-blade-text">Local Restaurants</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="" sm="6" lg="4" xl="3">
          <div class="section-blade sectionButton" @click="openCoupons">
            <b-img-lazy
              v-bind="mainProps"
              src="/images/photos/home_coupons.jpg"
              alt="Image 1"
            ></b-img-lazy>

            <div
              class="section-blade-content d-flex justify-content-center align-items-center"
            >
              <span class="section-blade-text">Coupons</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-navbar fixed="bottom" class="text-white" type="light" variant="dark">
      <small> © HiTown 2022</small>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import HWLoginStatus from '@/components/HWLoginStatus.vue'
// import HWUserOption from '@/components/HWUserOption.vue'
export default {
  transition(to, from) {
    console.log('to: ', to)
    console.log('from: ', from)
    if (!from) return 'slide-left'
    if (to.path.split('/').length > from.path.split('/').length)
      return 'slide-left'
    if (to.path.split('/').length < from.path.split('/').length)
      return 'slide-right'

    return 'slide-left'
  },
  components: {
    // HWLoginStatus,
    // HWUserOption
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: '#bbb',
        fluid: true,

        rounded: true,
      },
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
    }),
  },
  methods: {
    ...mapActions({
      loginByToken: 'auth/loginByToken',
      getRestList: 'rest/getRestList',
      getCategoryList: 'app/getCategoryList',
      logout: 'auth/logout',
    }),
    openRests() {
      this.$router.push('/home/restaurants');
    },
    async openCoupons() {
      if (!this.isAuthenticated) {
        const result = await this.loginByToken()
        if (result) this.getCategoryList()
        else {
          localStorage.setItem('latestRoute', '/home/coupon-category')
          this.$router.push('/auth/login')
        }
      } else
        this.$router.push('/home/coupon-category');
    },
  },
}
</script>
