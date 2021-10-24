<template>

    <v-col  >
      <h1>{{$t('search_header')}}</h1>
      <br>
                  <v-text-field
            :label="$t('search')"
            @keydown.enter.prevent="search"
            v-model="query"
            append-icon="mdi-magnify"
          ></v-text-field>

        
         
    <v-list v-if="results.length>0"
    
  
   class="overflow-y-auto"
    
    >

      <v-list-item-group 
        color="primary"
      >



        <v-list-item
          v-for="(item, i) in results"
          :key="i"

          
        >
         <v-list-item-content   @click="gotoBoard(item.boardid)">
                  <v-list-item-title v-text="item.title"  ></v-list-item-title>
{{item.description}}
</v-list-item-content>

        <v-list-item-action v-if="item.author!=null">
          <v-btn  @click="gotoUser(item.author)"  icon>
            <v-icon >mdi-account</v-icon>
          </v-btn>
        </v-list-item-action>

        </v-list-item>




      </v-list-item-group>
    </v-list>
  <h3 v-if="results.length==0">{{$t('no_results')}}</h3>

    <v-row v-else justify="center">
      
        <v-btn 
      @click="decrement()" 
      :disabled="pageNumber==0"
      icon
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <h2>  {{pageNumber}} </h2>
    

                <v-btn  
      @click="increment()" 
      :disabled="results.length<10"
      icon
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    </v-row>

    </v-col>

</template>
<script>

export default {
    setup() {
        
    },
    data(){
return {
    pageNumber:0,
    results:[],
    query:'',
    previousquery:''
}
    },
    methods:{
      gotoUser(userid){
        this.$router.push('/user/'+userid)
      },

      gotoBoard(boardid){
  this.$router.push('/board/'+boardid)
      },
      
        decrement(){

            this.pageNumber-=1;
            this.search()
        },
        increment(){
            this.pageNumber+=1;
            this.search()
        },
search(){

    if (this.query!=this.previousquery){
        this.previousquery=this.query
        this.pageNumber=0
    }

//.normalize("NFD").replace(/[\u0300-\u036f]/g, "")s
this.$axios.post('/search',{'query':this.query,'page':this.pageNumber}).then(response => { 



this.results=response.data;

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

}
</script>
