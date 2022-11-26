<template>
  <b-row>
    <b-col class="" sm="6" lg="4" xl="3">
      <div class="section-blade sectionButton" @click="onOpen">
        <b-img-lazy
          v-bind="mainProps"
          :src="existImgUrl"
          alt="Image 1"
        ></b-img-lazy>

        <div
          class="section-blade-content d-flex flex-column justify-content-center align-items-center"
        >
          <span class="section-blade-text">{{ title }}</span>
          <span class="section-blade-text">{{ subtitle }}</span>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'HWCoCategoryItem',
  props: {
    title: String,
    subtitle: String,
    imgUrl: String,
  },
  emits: ['onOpen'],
  computed: {
    existImgUrl() {
      return this.imgUrl
        ? this.imgUrl
        : '/images/photos/restaurants/restaurant-mrhero.jpeg'
    },
  },
  methods: {
    onOpen() {
      this.$emit('onOpen')
    },
  },
}
</script>
