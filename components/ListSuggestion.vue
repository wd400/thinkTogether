<template>

  <div
  >
 
    <v-list 
    
    style="max-height: 400px;min-width:200px"
   class="overflow-y-auto"
    
    >
                  <v-list-item-title class="text-h6" >
            {{$t('suggestions')}}
            </v-list-item-title>
      <v-list-item-group v-model="selected"
        color="primary"
      >


<div>
        <v-list-item
          v-for="(item, i) in suggestions"
          :key="i"

          
        >
         <v-list-item-content   @click="gotoCell.function(item.cellid)">
                  <v-list-item-title v-text="item.suggestion"  ></v-list-item-title>

</v-list-item-content>
        <v-list-item-action v-if="item.author!=null">
          <v-btn  @click="gotoUser(item.author)"  icon>
            <v-icon >mdi-account-question</v-icon>
          </v-btn>
        </v-list-item-action>
        </v-list-item>



</div>


      </v-list-item-group>
        <h5 v-if="suggestions.length==0">{{$t('no_suggestions')}}</h5>

    </v-list>



 <v-divider v-if="showReport|| selected!=null " ></v-divider>

          <div>
     <v-btn x-small
      @click="TshowReport()" v-if="!showReport &&selected!=null" 
    >
      <v-icon>mdi-flag</v-icon>
    </v-btn>
    
    <div v-if="showReport">
<v-btn x-small
      @click="FshowReport()" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Report :callback="suggestionReported" reportType="suggestion" :id="suggestions[selected].suggestionid" />
	</div>
    </div>

          <form
        accept-charset="UTF-8"
        v-on:submit.prevent="rateSuggestion()"
v-if="selected!=null"
      >  






<v-col>
    <v-row >
        <h5>{{$t('useless')}}</h5>
        <v-spacer/>
        <h5>{{$t('amazing')}}</h5>
    </v-row>
      <v-slider
        v-model="suggestionScore"
        step="20"
        tick-size="5"
        ticks="always"
      ></v-slider>

      <v-btn type="submit"  icon >
      <v-icon>mdi-send</v-icon>
    </v-btn>
</v-col>



          </form>




  </div>
</template>


<script>

export default{
    data() {
      return {
        suggestionScore: 0,
        suggestions:[],
        selected:null,
        showReport:false,

}
    },


props:{
    boardId:{
        required:true,
        type:Number
    },
    	gotoCell:{
		type:Object,
		required:true
	}
    

  },
  methods:{
    TshowReport(){
this.showReport=true
    },
        FshowReport(){
this.showReport=false
    },
    gotoUser(userid){
      this.$router.push('/user/'+user)
    },
      suggestionReported(){

            this.suggestions.splice(this.selected, 1); 

              this.showReport=false
              if (this.suggestions.length==0){
this.selected=null
this.gotoCell.function(null)
              } else{
              this.selected=Math.max(0,Math.min(this.selected,this.suggestions.length-1))
              this.gotoCell.function(this.suggestions[this.selected].cellid)
              }
              
              

      },
      rateSuggestion(){


            this.$axios.post(`/ratesuggestion/${this.suggestions[this.selected].suggestionid}`,{'rating':this.suggestionScore/10}).then(response => { 

this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })
this.suggestionReported()
}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

     


      }
},
     
     mounted(){
    //     alert(this.gotoCell)
    this.$axios.get('/viewsuggestions/'+this.boardId).then(response => { 


this.suggestions=response.data;

   //     alert(response.data);
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
     
}
</script>
