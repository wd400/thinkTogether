<template>

<v-row align="stretch">
<BoardList :user="userid" />
<v-spacer/>
<UserInfo :user="userid" />
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
     if (!isNaN(tmpUserId))
        this.userid=tmpUserId
    }

    },
          data() {
    return {
      userid: ''
    }
  },
}
</script>

<style scoped>

</style>
