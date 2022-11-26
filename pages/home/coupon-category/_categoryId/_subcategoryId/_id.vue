<template>
  <div>
    <b-navbar sticky type="dark" variant="dark">
      <div @click="onBack">
        <b-icon
          font-scale="1.5"
          icon="arrow-left-circle-fill"
          style="color: #fff"
        ></b-icon>
      </div>

      <b-navbar-brand class="ml-3" href="#">
        Return to List Coupons
      </b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-card
        :title="couponItem.title"
        :img-src="couponItem.imgUrl"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          {{ couponItem.description }}
        </b-card-text>

        <!-- <b-button
          :disabled="couponItem.validate"
          @click="openValidateModal"
          href="#"
          variant="primary"
          >Validate</b-button
        > -->

        <b-button variant="primary" @click="modalShow = !modalShow"
          >Validate</b-button
        >
      </b-card>

      <div>
        <b-modal v-model="modalShow" hide-footer>
          <CoCouponValidate
            :is-visible="true"
            @validateCoupon="onValidate"
            @closeModal="closeModal"
          />
        </b-modal>
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CoCouponValidate from '@/components/CoCouponValidate'
export default {
  transition(to, from) {
    if(!from)
      return 'slide-left'
    if(to.path.split('/').length > from.path.split('/').length)
      return 'slide-left'
    if(to.path.split('/').length < from.path.split('/').length)
      return 'slide-right'
  },
  components: {
    CoCouponValidate,
  },
  data() {
    return {
      code: '',
      validateModal: false,
      modalShow: false,
    }
  },
  // middleware: 'coupon',
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.authStatus,
      user: (state) => state.auth.user,
      couponItem: (state) => state.app.coupon
    })
  },
  mounted() {
    const path = this.$router.currentRoute.path;
    if(!this.isAuthenticated) {
      this.loginByToken()
        .then(res => {
          if(res)
            this.onInitCouponItem(path.split('/').reverse()[0])
          else {
            localStorage.setItem('latestRoute', this.$router.currentRoute.path);
            this.$router.push('/auth/login')
          }
        })
    } else
      this.onInitCouponItem(path.split('/').reverse()[0])
  },
  methods: {
    ...mapActions({
      setMsg: 'auth/setMsg',
      loginByToken: 'auth/loginByToken',
      getCouponItem: 'app/getCouponItem',
      putValidate: 'app/putValidate',
    }),
    ...mapMutations({
      addCouponId: 'auth/SET_COUPONS'
    }),
    onInitCouponItem(couponId) {
      this.getCouponItem(couponId)
    },
    onBack() {
      const path = this.$router.currentRoute.path;
      this.$router.push(path.split('/').reverse().slice(1).reverse().join('/'))
    },
    openValidateModal() {
      if (!this.couponItem.validate) this.validateModal = true
    },
    closeModal() {
      this.validateModal = false
    },
    async onValidate(code) {
      if (code.trim() !== this.$config.VALIDATE_CODE.toString()) {
        this.setMsg({ kind: 'errStr', msg: 'Invalid Code' })
        return
      }
      const data = {
        couponId: this.couponItem.id,
        userId: this.user.id,
        validateCode: code
      }

      const result = await this.putValidate(data)
      if (result) {
        this.addCouponId([this.couponItem.id])
        const path = this.$router.currentRoute.path;
        this.$router.push(path.split('/').reverse().slice(1).reverse().join('/'))
        this.validateModal = false
      }
    },
  },
}
</script>
