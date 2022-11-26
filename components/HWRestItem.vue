<template>
  <b-row>
    <b-col class="" sm="6" lg="4" xl="3">
      <div class="section-blade sectionButton" @click="onClick">
        <b-img-lazy
          :class="`${validate ? 'deactivated' : ''}`"
          v-bind="mainProps"
          :src="imgUrl"
          alt="Image 1"
        ></b-img-lazy>

        <div
          class="section-blade-content d-flex justify-content-center align-items-center"
        >
          <span class="section-blade-text">{{ name }}</span>
        </div>
      </div>
    </b-col>
  </b-row>
  <!-- <div class="rest-item" @click="onClick">
    <div class="card rounded-s shadow-xl" data-card-height="120" :style="{backgroundImage: `url(${imgUrl})`}">
      <div class="card-center">
          <div class="content ">
              <div class="d-flex">
                  <div>
                    <h1 class="color-white  font-25 mb-n2">{{name}}</h1>
                  </div>
              </div>
          </div>
      </div>
      <div class="card-overlay bg-black opacity-30 rounded-s shadow-xl"></div>
    </div>
  </div> -->
</template>
<script lang="ts">
export default {
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
  name: 'HWRestItem',
  props: {
    name: String,
    imgUrl: String,
  },
  emits: ['onClick'],
  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>
<style>
.rest-item {
  position: relative;
  margin: 20px 0;
  min-height: 100px;
  height: 100px;
}
.rest-item div.card {
  height: 100%;
}
</style>
