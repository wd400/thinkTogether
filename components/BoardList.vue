<template>

  <v-card
    class="mx-auto"
    min-width="500"
    max-width="700"
    tile

  >
<v-card-title v-if="editmode"  >
    
    

<v-btn icon    
      @click="FeditMode()"
    >
      <v-icon>mdi-arrow-left</v-icon>
      
    </v-btn>
    <h2 >
{{$t('edit_properties')}}
    </h2>
    </v-card-title>
    <v-card-title v-else  >
    <h2 >  {{$t('graph_list')}}</h2>

</v-card-title>

      <v-divider/>

 <v-list 
       >

                <v-list-item-group
        color="primary"
      >

      <v-list-item inactive :selectable="false" :ripple="false" v-if="editmode" >

<v-col>
<v-row align="center"> 
  <v-text-field 
            v-model="boards[selected].title"
            counter
            maxlength="100"
            :label="$t('title')"
            

@keydown.enter="saveTitle"

          ></v-text-field>

<v-btn icon
      @click="saveTitle(boards[selected])"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

</v-row>

<v-row align="center">
          <v-textarea
            v-model="boards[selected].description"
            counter
            maxlength="200"
            :label="$t('description')"

@keydown.enter="saveDescription"
          ></v-textarea>
<v-btn icon
      @click="saveDescription(boards[selected])"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

</v-row>

<v-row align="center" >

<v-btn icon
      @click="deleteBoard(boards[selected].boardid)"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-spacer/>
<v-col>
  <v-row>
    <v-checkbox
      v-model="boards[selected].public"

      :label="$t('public')"

      v-on:change="changePublic(boards[selected])"

    >
    </v-checkbox>

    <v-spacer/>

        <v-checkbox
      v-model="boards[selected].anonym"
      :label="$t('anonym')"
      :disabled="!boards[selected].public"
      v-on:change="changeAnonym(boards[selected])"
    ></v-checkbox>
  </v-row>



    <v-select style="width: 250px;"
          v-model="boards[selected].cat"
    
          :items="catlist"
          item-text="state"
          item-value="abbr"
          :hint="$t('category')"
          persistent-hint
          return-object
          single-line
          v-on:change="changeCat(boards[selected])"
        ></v-select>
</v-col>

</v-row>
</v-col>

      </v-list-item>
      

        <v-list-item v-else
          v-for="(item, i) in boards"
          :key="i"  
          fluid
          
        >
        <v-list-item-content @click="gotoBoard(item.boardid)" >
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
           
</v-list-item-content>
        <v-list-item-action v-if="user=='me'">
          <v-btn icon  @click="TeditMode(i)"  >
            <v-icon >mdi-dots-vertical</v-icon>
          </v-btn>
        </v-list-item-action>
        </v-list-item>


      </v-list-item-group>
      
  <h5 v-if="boards.length==0">{{$t('no_graphs')}}</h5>
    </v-list>


<v-btn v-if="user=='me' && boards.length<10 && !newBoardTemplate && !editmode"
      @click="newBoardTemplate=true"
 block   >
      <v-icon>mdi-plus</v-icon>
    </v-btn>


          <form
        accept-charset="UTF-8"
        v-on:submit.prevent="sumbitNewBoard()"
v-if="newBoardTemplate"
      >  


                <v-text-field
            v-model="newTitle"
            counter
            maxlength="100"
            :label="$t('title')"
            outlined
            :full-width="true"
            required
          ></v-text-field>



          <v-textarea
            v-model="newDescription"
            counter
            maxlength="200"
            :label="$t('description')"
            outlined
              :full-width="true"
              required

          ></v-textarea>

<v-container fluid>
  <v-col>
  <v-row>

    <v-checkbox
      v-model="newIsPublic"
      :label="$t('public')"
    ></v-checkbox>
        <v-checkbox
      v-model="newIsAnonym"
      :label="$t('anonym')"
    ></v-checkbox>
    <v-spacer/>
        <v-select
          v-model="newCat"
    required
          :items="catlist"
          item-text="state"
          item-value="abbr"

          :hint="$t('category')"
          persistent-hint
          return-object
          single-line
          :rules="[(v) => !!v || 'Gender is required']"
        ></v-select>
  </v-row>
  <v-row>
             <v-btn
      @click="closeNewBoard()"
    >{{$t('cancel')}}
    </v-btn>  
    <v-spacer/>
    <v-btn
        type="submit"
      >
        {{$t('submit')}}
      </v-btn>
 
  </v-row>



  </v-col>
</v-container>

          </form>



  </v-card>
</template>


<script>

export default{
   fetchOnServer:true,
    data() {
      return {
        boards: [],
        newBoardTemplate:false,
        newTitle:'',
        newDescription:'',
        newIsPublic:true,
        newIsAnonym:false,
        newCat:{ state: this.$t('other'), abbr: 0 },
        selected:-1,
        editmode:false,

        catlist: [
            { state: this.$t('other'), abbr: 0 },
          { state: this.$t('general_reflection'), abbr: 1 },
          { state: this.$t('personal_reflection'), abbr: 2 },
          { state: this.$t('science'), abbr: 3 },

        ],

      }
    },

props:{
    user:{
        required:true
    },


  },
  methods:{
        FeditMode(){
this.editmode=false;
    },
    TeditMode(i){
      this.selected=i
this.editmode=true;
    },

    saveTitle(item) {
 this._updateBoardMetadata(item.boardid,item.title,'renameboard')
},
saveDescription(item) {
   this._updateBoardMetadata(item.boardid,item.description,'changedescription')

},
changePublic(item){
     this._updateBoardMetadata(item.boardid,item.public,'changepublic')


},
changeAnonym(item){
     this._updateBoardMetadata(item.boardid,item.anonym,'changeanonym')

},
changeCat(item){
     this._updateBoardMetadata(item.boardid,item.cat.abbr,'changecat')

},

_updateBoardMetadata(boardid,data,endpoint) {

    this.$axios.post('/'+endpoint+'/'+boardid,{'data':data}).then(response => { 

        //boards=response.data;
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
      this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })


})
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

},
deleteBoard(boardid){

      this.$axios.get('/deleteboard/'+boardid).then(response => { 
        this.editmode=false;
    for( var i = 0; i < this.boards.length; i++){ 
    
        if ( this.boards[i].boardid === boardid) { 
    
            this.boards.splice(i, 1); 
            break;
        }

    
    }

}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

},

gotoBoard(boardid) {
  this.$router.push('/board/'+boardid)
},
closeNewBoard(){
  this.newBoardTemplate=false
  this.newTitle=''
  this.newDescription=''
  this.newIsPublic=true
  this.newIsAnonym=false
  this.newCat={ state: this.$t('other'), abbr: 0 }
},
sumbitNewBoard(){


    this.$axios.post('/newboard',
    {'title':this.newTitle,'description':this.newDescription,'public':this.newIsPublic,'anonym':this.newIsAnonym,'cat':this.newCat.abbr}
    ).then(response => { 

   this.boards.push({'boardid':response.data.boardid,'title':this.newTitle,'description':this.newDescription,'cat':this.newCat.abbr})
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')

*/
this.closeNewBoard()
})
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

}
  },
    

     mounted(){
    this.$axios.get('/boards/'+this.user).then(response => { 

console.log(response.status)


this.boards=response.data;
   //     alert(response.data);
        /*
	 this.$stor.dispatch('snackbar/setSnackbar',{text:$t('registered')})
      this.$router.push('/')
*/
}
)
.catch(error => {
 if(error.response.status==301){
   this.$router.push('/user/me')
} else {

      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })
}

});

     }
}
</script>
