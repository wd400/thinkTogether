<template>
    <v-container>
        <h1>{{ $t("login") }}</h1>
        <UserAuthForm buttonText="Login" :submitForm="loginUser"/>
    </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
export default {
    components: {
        UserAuthForm
    },
    methods: {
loginUser(logininfo){
    this.$auth.loginWith('local', {
        data: {logininfo},
        }).then(response => { 
              this.$notifier.showMessage({ content:this.$t('logged'), color: 'info' })

   
            //    alert(this.$auth.loggedIn)
     this.$router.push('/')
})
.catch(error => {

     if(error.response.status==403){
                     this.$notifier.showMessage({ content:this.$t('invalid_creds'), color: 'error' })

} else {

                  this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })
}


});
       

}
    },
    setup() {
        
    },
}
</script>

<style scoped>

</style>
