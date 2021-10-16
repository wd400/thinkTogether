<template>

<v-row align="stretch">
<BoardList :user="userid" />
<v-spacer/>
<div>
<UserInfo :user="userid" />


     <v-btn x-small
      @click="showReport=true" v-if="!showReport && userid!='me' && $auth.loggedIn" 
    >
      <v-icon>mdi-flag</v-icon>
    </v-btn>
    
    <div v-if="showReport">
<v-btn x-small
      @click="showReport=false" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Report :callback="userReported" reportType="user" :id="userid" />
	</div>


</div>
</v-row>



</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
export default {
    components: {
        UserAuthForm
    },
    created() {
    if (this.$route.params.user=="me"){
        this.userid=this.$route.params.user
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
    }
  }
}
</script>

<style scoped>

</style>
