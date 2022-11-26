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
          <h6 class="mb-0">Verify code</h6>
        </template>
        <b-card-text>
          <div class="input-style no-borders has-icon validate-field">
            <i class="fa fa-user"></i>
            <input
              id="userName"
              type="name"
              class="form-control validate-name"
              placeholder="Code"
              :value="code"
              @input="onInput"
            />

            <i class="fa fa-times disabled invalid color-red-dark"></i>
            <i class="fa fa-check disabled valid color-green-dark"></i>
          </div>
          <b-button
            class="mt-3"
            href="#"
            block
            variant="success"
            @click="onEnter"
          >
            Verify Code
          </b-button>
          <!-- <div
            :class="`toast toast-tiny toast-top bg-red-dark fade ${
              errStr ? 'show' : 'hide'
            }`"
            data-delay="3000"
            data-autohide="true"
          >
            <span>{{ errStr }}</span>
          </div> -->
        </b-card-text>
        <template #footer>
          <a class="resend-link" @click="onResend"> Resend Code </a>
        </template>
      </b-card>
    </b-container>

    <!-- <div class="verify-page">
    <div class="page-content header-clear-medium">                
        <div class="card">
            <div class="card-body mx-2">
                <div class="shadow-xl rounded-sm">
                    <div class="card bg-1 mb-0" data-card-height="150"></div>
                    <div class="clearfix"></div>
                    <div class="card-header d-flex justify-content-center align-items-center bg-green-dark mb-3">
                        <NuxtLink to="/auth/login" class="back-link">
                            <img src="/icons/back.svg" alt="back" />
                        </NuxtLink>
                        <h1 class="mt-2 color-white">Verify Code</h1>
                    </div>
                    <div class="px-3 pb-1">
                        <div class="input-style no-borders has-icon validate-field">
                            <i class="fa fa-user"></i>
                            <input id="userName" type="name" class="form-control validate-name" placeholder="Code" :value="code" @input="onInput" >
                            <label for="form1a" class="color-blue-dark font-10 mt-1">Name</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                        </div>
                        <a class="back-button btn btn-full btn-m rounded-s bg-green-dark font-700 mb-3 mt-4" @click="onEnter">
                            Enter
                        </a>
                        <div class="d-flex justify-content-center align-items-center mb-3 mt-4">
                            <a class="font-700 resend-link" @click="onResend">
                                Resend Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <b-alert class="m-3" dismissible :show="!!errStr" variant="danger">{{
      errStr
    }}</b-alert>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      code: '',
    }
  },
  computed: {
    ...mapState({
      reqInfo: (state) => state.auth.reqInfo,
      exist: (state) => state.auth.existUser,
      errStr: (state) => state.auth.errStr,
    }),
  },
  watch: {
    selected(value) {
      if (value === 'phone') this.isPhone = true
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
      loginVerify: 'auth/loginVerify',
      resendRequest: 'auth/resendRequest',
      setMsg: 'auth/setMsg',
    }),
    onInput(e) {
      this.code = e.target.value.trim()
    },
    onEnter() {
      if (!this.code) {
        this.setMsg({ kind: 'errStr', msg: 'Input the code' })
        return
      }

      const authData = {
        code: this.code,
        kind: this.reqInfo.kind,
        target:
          this.reqInfo.kind === 'phone'
            ? this.reqInfo.phoneNumber
            : this.reqInfo.email,
      }
      this.loginVerify({authDetails: authData, exist: this.exist})
    },
    onResend() {
      this.resendRequest(this.reqInfo)
    },
    onResetMsg() {
      // this.$bvToast.show('error-toast')

      setTimeout(() => {
        this.setMsg({ kind: 'errStr', msg: '' })
      }, 3000)
    },
  },
}
</script>
<style>
.verify-page .card-header {
  position: relative;
}
.verify-page a.back-link {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
}
.verify-page .toast {
  width: fit-content !important;
}
</style>
