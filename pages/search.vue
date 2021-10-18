<template>

    <v-col  >
        <v-row  justify="center">
                  <v-text-field
            :label="$t('search')"
            @keydown.enter.prevent="search"
            v-model="query"
          ></v-text-field>
          <v-btn 
      @click="search" 
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
        </v-row>
         
    <v-list 
    
  
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
<v-list-item-subtitle v-text="item.author" v-if="item.author!=null" ></v-list-item-subtitle>
{{item.description}}
</v-list-item-content>
        </v-list-item>




      </v-list-item-group>
    </v-list>
<br>
    <v-row justify="center">
        <v-btn 
      @click="decrement" 
      :disabled="pageNumber==0"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <h2>  {{pageNumber}} </h2>
    

                <v-btn  
      @click="increment" 
      :disabled="results.length<10"
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
