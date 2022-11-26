<template>
  <div class="login-status" @click="onClick">
    <img v-if="isAuthenticated" src="/icons/activeUser.svg" />
    <img v-else src="/icons/deactiveUser.svg" />
  </div>
</template>
<script>
export default {
  name: 'HWLoginStatus',
  props: {
    isAuthenticated: Boolean
  },
  emits: ["onClick"],
  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }
}
</script>
<style>
.login-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

.login-status img {
  width: 45px;
  height: 45px;
}
</style>