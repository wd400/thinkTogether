<template>
  <div>
          <v-textarea
            v-model="suggestion"
            counter
            maxlength="100"
            :label="$t('suggestion')"
            outlined
              :full-width="true"
              required

          ></v-textarea>


        <v-checkbox
      v-model="isAnonym"
      :label="$t('anonym')"
    ></v-checkbox>

<v-btn
      @click="sendSuggestion()" 
    >
      <v-icon>mdi-send</v-icon>
    </v-btn>

  </div>
</template>

<script>
  export default {
    props:{
	boardId:{
		type:Number,
		required:true,
	},
	cellId:{
		type:Number,
		required:false,
	},
  callback:{
    required:true
  }


  },
      data() {
    return {
      suggestion: '',
      isAnonym:false,


    }
      },
      methods:{
        sendSuggestion(){


            this.$axios.post(`/makesuggestion/${this.boardId}/${this.cellId}`,{'anonym':this.isAnonym,'suggestion':this.suggestion}).then(response => { 

this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })
this.callback()
}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

        }
      }
}
</script>
