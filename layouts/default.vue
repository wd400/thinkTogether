<template>
  <v-app >
    <!--
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-app-bar
      fixed
      app
    >
    <!--
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>


      <v-btn
        
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        
        @click.stop="fixed = !fixed"
      >
     
        <v-icon>mdi-minus</v-icon>

      </v-btn>
       -->
         <!--
      <v-spacer />
    <v-toolbar-title v-text="title" /> -->
     <v-btn text @click="gotoSearch()">{{$t('search')}}</v-btn>
  <v-btn text @click="gotoRandom()">{{$t('random')}}</v-btn>
  
   
     <div v-if="$auth.loggedIn">
     <v-btn text @click="gotoMe()">{{$t('me')}}</v-btn>
       </div> 
      <v-spacer />

      <v-btn icon @click="toggleTheme()">

 <v-icon>mdi-theme-light-dark</v-icon>


      </v-btn>

<div v-if="$auth.loggedIn">


      <v-btn  icon
        @click="gotoSettings()"
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>

  
   <v-btn text @click="logout()" >{{$t('logout')}}</v-btn>
  </div> 
  <div v-else>
    <v-btn text @click="gotoLogin()">{{$t('login')}}</v-btn>
    <v-btn text @click="gotoRegister()">{{$t('register')}}</v-btn>
</div>
<!--
      <v-btn
        
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!--
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >

      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
-->
  <Snackbar></Snackbar>
  <!--
    <v-footer
      :absolute="!fixed"
      app
    >
      <h5> {{  $t('footer') }} 
        
        
     (   <a
              href="https://discordapp.com/users/778187282841600012/"
              target="_blank"
              rel="noopener noreferrer"
            >wd400#0222</a> )

     </h5>
    </v-footer>
   -->

  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: { Snackbar },
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted() {
  const theme = localStorage.getItem("useDarkTheme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else this.$vuetify.theme.dark = false;
    }




},
  methods:{
    toggleTheme() {
   this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
   localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
    },
    
       gotoRandom(){

    this.$router.push("/newrandom")


     //  this.$refs.page.$forceUpdate()
     //      this.$router.push({path:'/board/random', force: true})
      
       },
    gotoRegister(){
this.$router.push('/register')
    },
    gotoLogin(){
       this.$router.push('/login')
    },
    logout(){
      this.$auth.logout()
    },
    gotoMe(){
      this.$router.push('/user/me')
    },
    gotoSearch(){
       this.$router.push('/search')
    },
    gotoSettings(){
       this.$router.push('/settings')
    }

  }
}
</script>


<style>
.container{
     max-width: 95vw;
     margin-top: 13px;
     padding:0px;
  }
</style>