<template>
  <div>
    <v-select
          v-model="select"
         
          :items="items"
          item-text="state"
          item-value="abbr"
          :label="$t('reason')"
          persistent-hint
          return-object
          single-line
        ></v-select>

          <v-textarea
            v-model="detail"
            counter
            maxlength="100"
            :label="$t('details')"
            outlined
              :full-width="true"
              required

          ></v-textarea>

<v-btn
      @click="sendReport()" 
    >
      <v-icon>mdi-send</v-icon>
    </v-btn>

  </div>
</template>

<script>
  export default {
    props:{
    reportType:{
        type:String,
        required:true
    },
	id:{
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
      detail: null,
       select: null,
        items: [
          { state: this.$t('advertising'), abbr: 1 },
          { state: this.$t('spam'), abbr: 2 },
          { state: this.$t('other'), abbr: 3 },
        ],

    }
      },
      methods:{
        sendReport(){
          if (this.select==null){
            this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })
          } else{
          let reportUri=`report${this.reportType}/${this.id}`
          if (this.reportType=='cell'){
            reportUri=reportUri+`/${this.cellId}`
          }

            this.$axios.post(reportUri,{'reason':this.select.abbr,'detail':this.detail}).then(response => { 

this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })
this.callback()
}

)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

        }
      }}
}
</script>
