<template>
    <v-container>
        <h1>{{ $t("Login") }}</h1>
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
