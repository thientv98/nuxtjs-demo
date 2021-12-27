import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.NUXT_PORT || 3200,
    host: '0.0.0.0', // default: localhost,
  },

  ssr: false,

  env: {
    baseURL: process.env.BASE_URL || 'http://localhost:3200',
    apiURL: process.env.API_URL || 'http://localhost:8000/api/',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - internal-message-cp',
    title: 'internal-message-cp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/mixins/validation",
    "~/plugins/mixins/user",
    "~/plugins/axios",
    { src: "~/plugins/vue-notification", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // components: {
  //   dirs: [
  //     '~/components',
  //     '~/components/Base'
  //   ]
  // },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // Module imported during dev and build time
  // Decrease node_module size, make production startup faster
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/composition-api/module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "data.token"
          },
          user: {
            url: "auth/me",
            method: "get",
            propertyName: "data.user"
          },
          logout: {
            url: "auth/logout",
            method: "get"
          }
        }
      }
    },
    redirect: {
      login: "/auth/login"
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#E08345',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
