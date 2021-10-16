<template>
    <v-container>
        <h1>Register</h1>

        <UserAuthForm :buttonText="$t('register')" :submitForm="registerUser" hasName="true"/>
  

    </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
export default {
    components: {
        UserAuthForm,
    },
    data:()=>({
        snackbar: false,
    }),
    methods: {
 registerUser(registerinfo){
     
    this.$axios.post('/register',registerinfo).then(response => { 
      this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
}


)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

    


}
    },
    setup() {
        
    },
}
</script>

<style scoped>

</style>
