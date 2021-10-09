<template>

<v-row align="stretch">
<v-spacer/>
<Suggestions v-if="!isauthor" :boardid="boardid" />
</v-row>



</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
export default {
    components: {
        UserAuthForm
    },
    created() {
     var tmpUserId = Number(this.$route.params.user)
     if (!isNaN(tmpUserId))
        this.userid=tmpUserId
    

    },
          data() {
    return {
      isauthor: '',
      xml:'',


    }
  },
}
</script>

<style scoped>

</style>
