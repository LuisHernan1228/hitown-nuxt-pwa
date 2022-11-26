<template>
  <div class="mt-3">
    <b-container>
      <NuxtLink to="/home">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #555"
        >
        </b-icon>
      </NuxtLink>
      <b-card header-tag="header" class="mt-3" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">Login / Register</h6>
        </template>
        <b-card-text>
          <div class="px-3 pb-1">
            <VuePhoneNumberInput
              v-model="phoneNumber"
              @update="onChangePhoneNumber"
            />
            <div
              v-if="!isPhone"
              class="input-style no-borders has-icon validate-field"
            >
              <i class="fa fa-user"></i>
              <input
                id="userName"
                type="name"
                class="form-control validate-name"
                placeholder="Email"
                :value="reqDetails.email"
                @input="onInput"
              />

              <i class="fa fa-times disabled invalid color-red-dark"></i>
              <i class="fa fa-check disabled valid color-green-dark"></i>
            </div>
            <br />
            <div class="form-check">
              <input
                id="flexRadioDefault1"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                checked
                @click="changeMethod('phone')"
              />
              <label
                class="form-check-label"
                for="flexRadioDefault1"
                @click="changeMethod('phone')"
              >
                Send the code to my phone
              </label>
            </div>
            <div class="form-check">
              <input
                id="flexRadioDefault2"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                @click="changeMethod('email')"
              />
              <label
                class="form-check-label"
                for="flexRadioDefault2"
                @click="changeMethod('email')"
              >
                Send the code to my email
              </label>
            </div>
          </div>
        </b-card-text>

        <template #footer>
          <b-button href="#" block  variant="success" @click="onLogin">
            <img v-if="isPhone" src="/icons/phone.svg" />
            <img v-else src="/icons/email.svg" />
            <span>Send the code to my&nbsp;</span>
            <span v-if="isPhone">phone</span>
            <span v-else>email</span>
          </b-button>
        </template>
      </b-card>
    </b-container>

    <!-- <div class="page-content header-clear-medium">
      <div class="card">
        <div class="card-body mx-2">
          <div class="shadow-xl rounded-sm">
            <div class="card bg-1 mb-0" data-card-height="150"></div>
            <div class="clearfix"></div>
            <div
              class="card-header d-flex justify-content-center align-items-center bg-green-dark mb-3"
            >
              <div class="back-link" @click="goBack">
                <img src="/icons/back.svg" alt="back" />
              </div>
              <h1 class="mt-2 color-white">Login</h1>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div
      :class="`toast toast-tiny toast-top bg-red-dark fade ${
        errStr ? 'show' : 'hide'
      }`"
      data-delay="3000"
      data-autohide="true"
    >
      <span>{{ errStr }}</span>
    </div> -->



 <b-alert class="m-3" dismissible :show="!!errStr" variant="danger">{{
      errStr
    }}</b-alert>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      reqDetails: {
        kind: 'phone',
        phoneNumber: '',
        email: '',
      },
      isPhone: true,
      phoneNumber: '',
      validPhoneNumber: false,
    }
  },
  computed: {
    ...mapState({
      errStr: (state) => state.auth.errStr,
    }),
  },
  watch: {
    reqDetails(value) {
      if (value.kind === 'phone') this.isPhone = true
      else this.isPhone = false
    },
    errStr(value) {
      if (value) {
        this.onResetMsg()
      }
    },
  },
  methods: {
    ...mapActions({
      loginRequest: 'auth/loginRequest',
      loginByToken: 'auth/loginByToken',
      setMsg: 'auth/setMsg',
      goBack: 'auth/goBack',
    }),
    changeMethod(value) {
      this.reqDetails = { ...this.reqDetails, kind: value, email: '' }
      this.setMsg({ kind: 'errStr', msg: '' })
    },
    onInput(e) {
      this.reqDetails = { ...this.reqDetails, email: e.target.value.trim() }
    },
    onChangePhoneNumber(e) {
      console.log('e value: ', e)
      this.reqDetails = { ...this.reqDetails, phoneNumber: e.formattedNumber }
      this.phoneNumber = e.nationalNumber
      this.validPhoneNumber = e.isValid
    },
    onLogin() {
      if (this.reqDetails.phoneNumber === '') {
        this.setMsg({ kind: 'errStr', msg: 'Input Phone number' })
        return
      }

      if (!this.isPhone && this.reqDetails.email === '') {
        this.setMsg({ kind: 'errStr', msg: 'Input email' })
        return
      }

      if (!this.validPhoneNumber) {
        this.setMsg({ kind: 'errStr', msg: 'Invalid Phone number' })
        return
      }

      // eslint-disable-next-line
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!this.isPhone && !re.test(this.reqDetails.email)) {
        this.setMsg({ kind: 'errStr', msg: 'Invalid Email' })
        return
      }

      this.loginRequest(this.reqDetails)
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
