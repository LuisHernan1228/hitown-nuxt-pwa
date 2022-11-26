<template>
  <div class="mt-3">
    <b-container>
      <NuxtLink to="/" class="back-link">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #555"
        >
        </b-icon>
      </NuxtLink>

      <b-card header-tag="header" class="mt-3" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">Profile</h6>
        </template>
        <b-card-text>
          <div class="px-3 pb-1">
            <b-form-input v-model="userInfo.fullname" placeholder="Fullname"></b-form-input>
            <b-form-datepicker
              v-model="userInfo.dob"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="en"
              class="mt-3 mb-3"
              disabled
            ></b-form-datepicker>
            <b-form-input v-model="userInfo.phoneNumber" placeholder="Phone Number" disabled></b-form-input>
            <b-form-input v-model="userInfo.email" placeholder="Email" class="mt-3"></b-form-input>
          </div>

          <b-button
            class="mt-3"
            href="#"
            block
            variant="success"
            @click="onUpdateProfile"
          >
            Update Profile
          </b-button>
        </b-card-text>
        <template #footer> </template>
      </b-card>
    </b-container>

    <b-alert class="m-3" dismissible :show="!!errStr" variant="danger">
      {{errStr}}
    </b-alert>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  data(){
    return {
      userInfo: {
        fullname: '',
        dob: '',
        phoneNumber: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      errStr: (state) => state.auth.errStr,
      isAuthorized: (state) => state.auth.authStatus
    })
  },
  mounted() {
    if(!this.isAuthorized) {
      this.$router.push('/home')
    } else {
      const {fullname, dob, phoneNumber, email} = this.user
      this.userInfo = {fullname, dob, phoneNumber, email};
    }
  },
  methods: {
    ...mapActions({
      loginByToken: 'auth/loginByToken',
      updateProfile: 'auth/updateProfile'
    }),
    onUpdateProfile() {
      this.updateProfile({...this.userInfo, id: this.user.id})
    },
  }
}
</script>