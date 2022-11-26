<template>
  <b-row @click="onOpen">
    <b-col class="" sm="6" lg="4" xl="3">
      <div class="section-blade sectionButton" @click="onOpen">
        <b-img-lazy
          :class="`${validate ? 'deactivated' : ''}`"
          v-bind="mainProps"
          :src="existImgUrl"
          alt="Image 1"
        ></b-img-lazy>

        <div
          class="section-blade-content d-flex justify-content-center align-items-center"
        >
          <span class="section-blade-text">{{ title }}</span>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'CoCouponItem',
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: '#bbb',
        fluid: true,

        rounded: true,
      },
    }
  },
  props: {
    title: String,
    validate: Boolean,
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
<style>
.coupon-item {
  position: relative;
  margin: 20px 0;
  min-height: 100px;
  height: 100px;
}
.coupon-item div.card {
  height: 100%;
}
.deactivated {
  filter: brightness(30%);
  color: grey;
}
</style>
