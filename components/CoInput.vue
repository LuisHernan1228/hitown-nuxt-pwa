<template>
  <div>
    <div
      :class="`input-style ${
        hasBorder ? 'has-borders' : 'no-borders'
      } validate-field`"
    >
      <i v-if="!hasBorder" class="fa fa-user"></i>
      <input
        id="userName"
        type="name"
        class="form-control validate-name"
        :placeholder="fieldPlaceholder"
        :value="value"
        @input="onInput"
      />

      <i class="fa fa-times disabled invalid color-red-dark"></i>
      <i class="fa fa-check disabled valid color-green-dark"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CoInput',
  props: {
    fieldName: String,
    fieldPlaceholder: String,
    hasBorder: Boolean,
  },
  emits: ['onChangeValue'],
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onInput(e) {
      console.log('e', e.target.value)
      this.value = e.target.value
      this.$emit('onChangeValue', { name: this.fieldName, value: this.value })
    },
  },
}
</script>
