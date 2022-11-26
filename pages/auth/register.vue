<template>
  <div class="mt-3">
    <b-container>
      <NuxtLink to="/auth/login" class="back-link">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #555"
        >
        </b-icon>
      </NuxtLink>

      <b-card header-tag="header" class="mt-3" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">Register</h6>
        </template>
        <b-card-text>
          <div class="px-3 pb-1">
            <div class="input-style no-borders has-icon validate-field">
              <i class="fa fa-user"></i>
              <input
                type="text"
                class="form-control validate-name"
                id="form1a"
                placeholder="Fullname"
                name="fullname"
                :value="userInfo.fullname"
                @input="onChange"
              />
            </div>
            <b-form-datepicker
              v-model="userInfo.dob"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="en"
              class="mt-3 mb-3"
            ></b-form-datepicker>
            <div class="input-style no-borders has-icon validate-field mt-2">
              <i class="fa fa-at"></i>
              <input
                v-if="!isEmail"
                type="email"
                class="form-control validate-name"
                id="form1aa"
                placeholder="Email"
                name="email"
                :value="userInfo.email"
                @input="onChange"
              />

              <i class="fa fa-times disabled invalid color-red-dark"></i>
              <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>
          </div>

          <b-button
            class="mt-3"
            href="#"
            block
            variant="success"
            @click="onRegister"
          >
            Create Account
          </b-button>
        </b-card-text>
        <template #footer> </template>
      </b-card>
    </b-container>

    <b-alert class="m-3" dismissible :show="!!errStr" variant="danger">{{
      errStr
    }}</b-alert>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    // VuePhoneNumberInput,
  },
  data() {
    return {
      userInfo: {
        username: '',
        fullname: '',
        phoneNumber: '',
        email: '',
        dob: ''
      },
      isEmail: false
    }
  },
  computed: {
    ...mapState({
      errStr: (state) => state.auth.errStr,
      reqInfo: (state) => state.auth.reqInfo
    })
  },
  mounted() {
    this.userInfo = {...this.userInfo, email: this.reqInfo.email, phoneNumber: this.reqInfo.phoneNumber, username: 'user' + this.reqInfo.phoneNumber}
    if(this.reqInfo.email)
      this.isEmail = true;
    else
      this.isEmail = false;

    console.log("watch reqInfo: ", this.reqInfo, this.userInfo, this.isEmail);
  },
  watch: {
    errStr(value) {
      if (value) {
        this.onResetMsg()
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      setMsg: 'auth/setMsg',
    }),
    onRegister() {
      let validate = true

      Object.keys(this.userInfo).forEach((key) => {
        if (this.userInfo[key] === '') validate = false
      })

      // eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!re.test(this.userInfo.email)) {
        this.setMsg({ kind: 'errStr', msg: 'Invalid Email' })
        return
      }

      if (validate) {
        console.log("userinfo: ", this.userInfo);
        this.register(this.userInfo)
        this.setMsg({ kind: 'errStr', msg: '' });
      } else
        this.setMsg({ kind: 'errStr', msg: 'Fill the form' });
    },
    onChange(e) {
      this.userInfo = {
        ...this.userInfo,
        [e.target.name]: e.target.value.trim(),
      }
    },
    onResetMsg() {
      setTimeout(() => {
        this.setMsg({ kind: 'errStr', msg: '' })
      }, 3000)
    },
  },
}
</script>
<style>

.vue-phone-number-input {
  border: 1px solid lightgray;
  /* border-left-width: 0;
  border-top-width: 0;
  border-right-width: 0; */
  margin-top: 15px !important;
  margin-bottom: 15px !important;
}
.vue-phone-number-input input {
  border: none !important;
}
.vue-phone-number-input .country-selector__label {
  display: none;
}
.vue-phone-number-input .country-selector {
  display: flex;
  align-items: center;
}
.vue-phone-number-input .country-selector .country-selector__country-flag {
  top: auto;
}
.vue-phone-number-input .country-selector input {
  padding-top: 0 !important;
}
</style>
