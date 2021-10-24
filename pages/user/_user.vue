<template>

<v-row>
  

<BoardList :user="userid" />
<v-spacer/>
<v-col>

<div>
  
<UserInfo :user="userid" />


     <v-btn x-small icon
      @click="setShowReport(true)" v-if="!showReport && userid!='me' && $auth.loggedIn" 
    >
      <v-icon>mdi-flag</v-icon>
    </v-btn>
    
    <div v-if="showReport">
<v-btn x-small icon
      @click="setShowReport(false)" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Report :callback="userReported" reportType="user" :id="userid" />
	</div>


</div>
<MyInvitations v-if="userid=='me'"/>
</v-col>
</v-row>



</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
import MyInvitations from '~/components/MyInvitations.vue'
export default {
    components: {
        UserAuthForm,
        MyInvitations
    },
    created() {
    if (this.$route.params.user=="me"){
      if (this.$auth.loggedIn){
        this.userid="me"
      } else {
        this.$router.push('/login')
      }
    } else{
     var tmpUserId = Number(this.$route.params.user)
     if (isNaN(tmpUserId)) {
       this.$router.push('/')
     } else {
        this.userid=tmpUserId
     }
    }

    },
          data() {
    return {
      userid: 0,
      showReport:false
    }
  },
  methods:{
    userReported() {
this.showReport=false
    },
    setShowReport(value){
      this.showReport=value
    }
  }
}
</script>

<style scoped>

</style>
