<template>
  <div>
    <b-card header-tag="header" footer-tag="footer" title="Shop CODE">
      <b-card-text>Merchant should enter his code</b-card-text>
      <CoInput
        :fieldName="'title'"
        :hasBorder="false"
        :fieldPlaceholder="`code`"
        @onChangeValue="onInput"
      />
    </b-card>

    <!-- <div :class="`${isVisible ? 'back-drop' : ''}`" @click="closeModal"></div> -->
    <div
      :class="`menu menu-box-modal rounded-0 ${isVisible ? 'menu-active' : ''}`"
      data-menu-width="300"
      data-menu-height="380"
    >
      <div class="text-center">
        <div class="body-container">
          <!-- <div class="d-flex justify-content-between header header-fixed header-logo-app w-100">
              <span class="title">Shop CODE</span>
              <i class="fa fa-times color-red-dark"></i>
            </div> -->

          <b-button
            class="mt-3"
            href="#"
            block
            variant="success"
            @click="validateCoupon"
          >
            Validate
          </b-button>
        </div>
      </div>
    </div>
    <b-alert class="m-3 text-red" dismissible :show="!!errStr" variant="danger">{{
      errStr
    }}</b-alert>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    isVisible: Boolean,
  },
  watch: {
    errStr(value) {
      if (value) {
        this.onResetMsg()
      }
    },
  },
  data() {
    return {
      code: '',
    }
  },
  computed: {
    ...mapState({
      errStr: (state) => state.auth.errStr,
    }),
  },
  emits: ['closeModal', 'validateCoupon'],
  methods: {
    ...mapActions({
      setMsg: 'auth/setMsg',
    }),
    validateCoupon() {
      if (!this.code) {
        this.setMsg({ kind: 'errStr', msg: 'Input the code' })
        return
      }
      this.$emit('validateCoupon', this.code)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    onInput(info) {
      this.code = info.value
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
.coupon-validate .body-container {
  padding: 0 30px;
}
.coupon-validate span.title {
  color: black;
}
.coupon-validate .toast {
  width: fit-content !important;
  z-index: 111;
}
</style>
