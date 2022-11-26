<template>
  <div class="rest-page">
    <div class="rest-page-header">
      <NuxtLink
        to="/home/restaurants"
        class="close-menu btn btn-m btn-full rounded-0 text-uppercase font-500 shadow-s"
      >
        click here to return to Restaurants list
      </NuxtLink>
    </div>
    <iframe :src="siteUrl" class="second-row"></iframe>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  transition(to, from) {
    if(!from)
      return 'slide-left'
    if(to.path.split('/').length > from.path.split('/').length)
      return 'slide-left'
    if(to.path.split('/').length < from.path.split('/').length)
      return 'slide-right'
  },
  computed: {
    ...mapState({
      siteUrl: (state) => state.rest.siteUrl,
    }),
  },
}
</script>
<style>
.rest-page .rest-page-header {
  height: 46px;
}

.rest-page iframe {
  width: 100%;
  height: calc(100vh - 46px);
}
</style>
