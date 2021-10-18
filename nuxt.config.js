import colors from 'vuetify/es5/util/colors'



export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',



  

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - thinktogether',
    title: 'thinktogether',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  static: {
    prefix: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/notifier.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          login: 'Login',
          logout: 'Logout',
          logged: 'Logged',
          register: 'Register',
          name:'Name',
          email:'Email',
          password:'Password',
          signed:'Signed in',
          registered:'Registered',
          error:'Error',
          search:'Search',
          random:'Random',
          me:'Me',
          boards:'Boards',
          title:'Title',
          description:'Description',
          submit:'Submit',
          cancel:'Cancel',
          public:'Public',
          anonym:'Anonym',
          done:'Done',
          score:'Score',
          banned:'Banned',
          user404:'User not found',
          rename_user:'Rename user',
          change_password:'Change password',
          delete_account:'Delete account',
          new_pseudo:'New pseudo',
          new_password:'New password',
          current_password:'Current password',
          change_mail: 'Change mail',
          new_mail:'New mail',
          user:'User',
          organic_layout:'Organic Layout',
          cut:'Cut',
          copy:'Copy',
          paste:'Paste',
          delete:'Delete',
          undo:'Undo',
          redo:'Redo',
          print:'Print',
          show:'Show',
          zoomIn:'Zoom In',
          zoomOut:'Zoom Out',
          actualSize: 'Actual size',
          fit:'Fit',
          saved:'Saved',
          reason:'Reason',
          details:'Details',
          advertising:'Advertising',
          spam:'SPAM',
          other:'Other',
          suggestion:'Suggestion',
          suggestions:'Suggestions',
          amazing:'Amazing',
          useless:'Useless',
          author:'Author',
          anonymous:'Anonymous',
          my_invitations:'My invitations',
          invited:'Invited',
          new_pseudo:'New pseudo',
          no_suggestions:'No suggestions'
         
        },
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://127.0.0.1:5000/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.txt$/,
        loader: "raw-loader"
      });
    }
  },

  auth: {
    strategies: {
      local: {
        
        token: {
          property: 'token',
          global: true,
           required: true,
           type: ''
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/revoketoken', method: 'get' },
         user:false
        }
      }
    }
  }

  
}
