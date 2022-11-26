<template>
  <div class="add-coupon">
    <div :class="`${isVisible ? 'back-drop' : ''}`" @click="closeModal"></div>
    <div
      :class="`menu menu-box-modal rounded-0 ${isVisible ? 'menu-active' : ''}`"
      data-menu-width="300"
      data-menu-height="380"
    >
      <div class="text-center">
        <div class="card-header d-flex justify-content-center align-items-center bg-green-dark mb-3">
            <h1 class="mt-2 color-white">Add Coupon</h1>
        </div>
        <div class="add-content">
          <CoInput :fieldName="'title'" :hasBorder="true" :fieldPlaceholder="'Title'" @onChangeValue="onInput" />
          <CoTextarea :fieldName="'description'" :fieldPlaceholder="'Description'" :hasBorder="true" @onChangeValue="onInput" />
        </div>
        
        <a class="close-menu color-theme font-15 text-center py-3 d-block" @click="addCoupon">Add</a>
        <a class="close-menu color-theme font-15 text-center py-3 d-block" @click="closeModal">Cancel</a>
      </div>
    </div>
    <div :class="`toast toast-tiny toast-top bg-red-dark fade ${errStr ? 'show' : 'hide'}`" data-delay="3000" data-autohide="true">
      <span>{{errStr}}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import CoInput from './CoInput.vue'
import CoTextarea from './CoTextarea.vue'
export default {
  components: {
    CoInput,
    CoTextarea
  },
  props: {
      isVisible: Boolean
  },
  data() {
      return {
          coupon: {
              title: "",
              description: ""
          }
      };
  },
  computed: {
    ...mapState({
      errStr: (state) => state.auth.errStr
    })
  },
  watch: {
    errStr(value) {
      if(value) {
        this.onResetMsg()
      }
    }
  },
  emits: [
      "closeModal",
      "addCoupon"
  ],
  methods: {
    ...mapActions({
      setMsg: 'auth/setMsg'
    }),
    addCoupon() {
      let validate = true;

      Object.keys(this.coupon).forEach(key => {
        if(this.coupon[key] === '')
          validate = false;
      })

      if(validate) {
        this.$emit("addCoupon", this.coupon);
        this.setMsg({ kind: 'errStr', msg: '' });
      }
      else
        this.setMsg({ kind: 'errStr', msg: 'Fill the form' });
        
    },
    closeModal() {
      this.$emit("closeModal");
    },
    onInput(info) {
      this.coupon = { ...this.coupon, [info.name]: info.value };
    },
    onResetMsg () {
      setTimeout(() => {
        this.setMsg({ kind: 'errStr', msg: '' })
      }, 3000)
    }
  },
}
</script>
<style>
.add-coupon .add-content {
  padding: 20px;
}

.add-coupon div.menu-active {
  width: 300px;
}

.add-coupon .toast {
  width: fit-content !important;
  z-index: 111;
}

.back-drop {
  position: fixed;
  top: -100px;
  bottom: -100px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 35%);
  z-index: 100;
}
</style>
