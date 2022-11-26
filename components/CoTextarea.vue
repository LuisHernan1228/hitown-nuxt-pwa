<template>
  <div>
    <div :class="`input-style ${hasBorder ? 'has-borders' : 'no-borders'} validate-field`">
      <i class="fa fa-user"></i>
      <textarea class="form-control validate-name" :placeholder="fieldPlaceholder" :value="value" @input="onInput" >
      </textarea>
      <label for="form1a" class="color-blue-dark font-10 mt-1">Name</label>
      <i class="fa fa-times disabled invalid color-red-dark"></i>
      <i class="fa fa-check disabled valid color-green-dark"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CoTextarea',
  props: {
    fieldName: String,
    hasBorder: Boolean,
    fieldPlaceholder: String,
  },
  emits: ["onChangeValue"],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onInput(e) {
      console.log("e", e.target.value)
      this.value = e.target.value
      this.$emit('onChangeValue', {name: this.fieldName, value: this.value})
    },
  }
}
</script>