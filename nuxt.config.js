export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    VALIDATE_CODE: process.env.VALIDATE_CODE,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hitown-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/custom/css/myStyle.css'],

  script: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    'bootstrap-vue/nuxt',
  ],

  bootstrapVue: {
    components: [
      'BBreadcrumb',
      'BBreadcrumbItem',
      'BVToastPlugin',
      'BCard',
      'BCardText',
      'BImg',
      'BImgLazy',
      'BIcon',
      'BContainer',
      'BToast',
      'VBScrollspy',
      'BAlert',
      'BNav',
      'BNavbarNav',
      'BNavbar',
      'BNavbarBrand',
      'BNavbarToggle',
      'BNavbarItemDropdown',
      'BNavItem',
      'BNavItemDropdown',
      'BDropdownItem',
      'BDropdown',

      'BCollapse',

      'BButton',
      'BButtonClose',
      'BButtonGroup',
      'BCol',
      'BCollapse',
      'BContainer',
      'BFormInput',
      'BFormInput',
      'BFormGroup',
      'BFormCheckbox',
      'BFormTextarea',
      'BFormDatepicker',
      'BFormRadio',
      'BFormRadioGroup',
      'BInputGroup',
      'BModal',
      'BRow',
    ],
    icons: true,
  },

  router: {
    middleware: 'auth',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL,
    proxyHeaders: false,
    credentials: false,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'HiTown',
      author: 'Me',
    },
    manifest: {
      name: 'HiTown',
      short_name: 'HiTown',
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
