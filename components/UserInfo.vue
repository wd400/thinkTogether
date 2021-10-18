<template>
<v-card   max-height="100">
    <v-card-title>
    {{pseudo}}
    </v-card-title>

<v-card-subtitle v-if="banned">
    {{$t('banned')}}
</v-card-subtitle>
<v-card-text>{{$t('score')}}: {{score}}</v-card-text>
</v-card>


</template>


<script>
export default {
props:{
    user:{
        required:true
    },


  },
      data() {
      return {
        pseudo: '',
        score:0,
        banned:false,
      }
    },



     mounted(){
       this.$axios.get('/getuserinfo/'+this.user).then(response => { 

this.pseudo=response.data.pseudo;
this.score=response.data.score;
this.banned=response.data.banned;

   //     alert(response.data);
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
}


)
.catch(error => {
  if (error.response.status==404){
this.pseudo=this.$t('user404')
  }
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});
     }

}

</script>
