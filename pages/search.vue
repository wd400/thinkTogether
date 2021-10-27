<template>

    <v-container  >
      <v-col>
        <v-row justify="center">
      <h1>{{$t('search_header')}}</h1>
        </v-row>
      <br>

       <v-row align="center"  justify="center">

<v-col          cols="6"
          sm="3"
          >
                  <v-text-field
            :label="$t('search')"
            @keydown.enter.prevent="search"
            v-model="query"
          ></v-text-field>
</v-col>
                <v-col
          cols="6"
          sm="3"
        >
              <v-select 
    v-model="currentCat"
          :items="catlist"
          item-text="state"
          item-value="abbr"
          :hint="$t('category')"
          persistent-hint
          return-object
          single-line
        ></v-select>
                </v-col>

                <v-btn icon
      @click="search()"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
       </v-row>

        
<v-row           cols="6"
          sm="3"
           align="center"  justify="center"
          >         
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
                  <v-list-item-subtitle class="text--primary" v-text="cat2text[item.cat]"></v-list-item-subtitle>
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
</v-row>


  
  
     <v-row justify="center">
         <h3 v-if="results.length==0">{{$t('no_results')}}</h3>
           <span v-else >
                 <br>
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
 </span>
    </v-row>
   
      </v-col>

    </v-container>

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
    previousquery:'',
    currentCat:{abbr:-1},
    cat2text:{
      0:this.$t('other'),
      1:this.$t('general_reflection'),
      2:this.$t('personal_reflection'),
      3:this.$t('science')
    },

    catlist: [
      { state: this.$t('all'), abbr: -1 },
            
          { state: this.$t('general_reflection'), abbr: 1 },
          { state: this.$t('personal_reflection'), abbr: 2 },
          { state: this.$t('science'), abbr: 3 },
          { state: this.$t('other'), abbr: 0 },

        ],


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
this.$axios.post('/search',{'query':this.query,'cat':this.currentCat.abbr,'page':this.pageNumber}).then(response => { 


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
