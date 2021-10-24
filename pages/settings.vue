<template>
<div>
  <br>
<v-layout column wrap  >
    <v-layout row justify-center align-center>
<v-flex xs2 md3>
        <h3>{{$t('rename_user')}}</h3>  
</v-flex>

<v-flex xs2 md3>
<v-text-field 
            v-model="newPseudo"
            counter
            maxlength="35"
            :label="$t('new_pseudo')"
            

@keydown.enter="saveTitle"

          ></v-text-field>
</v-flex>
<v-flex xs2 md3 >
  <v-btn icon @click="savePseudo()"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
</v-flex>


    </v-layout >

    <v-layout row justify-center align-center>
<v-flex xs2 md3>
        <h3>{{$t('change_mail')}}</h3>  
</v-flex>

<v-flex xs2 md3>
<v-text-field 
            v-model="newMail"
            counter
            maxlength="35"
            :label="$t('new_mail')"
            

@keydown.enter="saveTitle"

          ></v-text-field>
</v-flex>
<v-flex xs2 md3 >
  <v-btn icon @click="saveMail()"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
</v-flex>


    </v-layout >

    <v-layout row justify-center align-center>
<v-flex xs2 md3 >
        <h3>{{$t('change_password')}}</h3>
        
</v-flex>

<v-flex xs2 md3 >
 <PasswordField :needed="false" :title="$t('new_password')" :destination="newPasswordRef"/>
</v-flex>
<v-flex xs2 md3 >
    <v-btn icon  @click="savePassword()"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
</v-flex>

    </v-layout >

    <v-layout row justify-center align-center>

     <v-flex xs2 md3 >
        <h3>{{$t('delete_account')}}</h3>
        
</v-flex>
      <v-flex xs2 md3 >
        
</v-flex>
      <v-flex xs2 md3 >
  <v-btn icon @click="deleteAccount()"
    >
      <v-icon>mdi-account-remove</v-icon>
    </v-btn>
</v-flex>

    </v-layout>

  <v-layout row  justify-center>
<v-flex xs2 md3>

</v-flex>
<v-flex xs2 md3>

</v-flex>

 <v-flex xs2 md3 >
       <PasswordField :title="$t('current_password')" :destination="payload"/>
 </v-flex>



  </v-layout>


</v-layout>
</div>
<!--

2-rename user
3-change password
4-delete account



 <PasswordField :destination="loginInfo"/> 


-->

</template>


<script>
export default {

      data() {
      return {
          payload:{
password:''
          },
        newPseudo: '',
        newMail:'',
        newPasswordRef:{
password:''
        }
        
      }
    },
    created() {
        if ( !this.$auth.loggedIn){
            this.$router.push('/login')
        }
    },
    methods:{
      savePseudo(){
this._updateUserMetadata('renameuser',this.newPseudo)
      },
      saveMail(){
this._updateUserMetadata('changemail',this.newMail)
      },
      savePassword(){
        this._updateUserMetadata('changepassword',this.newPasswordRef.password)

      },
      deleteAccount(){

        this.$axios.post('/deleteaccount',{'password':this.payload.password}).then(response => { 

        //boards=response.data;
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
      this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })
      this.$auth.logout()
      this.$router.push('/')


})
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

      },

      _updateUserMetadata(endpoint,data) {

    this.$axios.post('/'+endpoint,{'data':data,'password':this.payload.password}).then(response => { 

        //boards=response.data;
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
      this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })


})
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

},
    }




}

</script>
