<template>

  <v-card
    class="mx-auto"
    min-width="500"
  max-width="1000"
    tile
  >
 
    <v-list 
    
  >
                  <v-list-item-title class="text-h6" >
            {{$t('boards')}}
            </v-list-item-title>
      <v-list-item-group
        color="primary"
      >

<div v-if="user=='me'">
          <v-container 
          
                    v-for="(item, i) in boards"
          :key="i"
          fluid  >
<v-row align="center">
          <v-text-field 
            v-model="item.title"
            counter
            maxlength="100"
            :label="$t('title')"
            

@keydown.enter="saveTitle"

          ></v-text-field>

<v-btn
      @click="saveTitle(item)"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

</v-row>

<v-row align="center">
          <v-textarea
            v-model="item.description"
            counter
            maxlength="200"
            :label="$t('description')"

@keydown.enter="saveDescription"
          ></v-textarea>
<v-btn
      @click="saveDescription(item)"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>

</v-row>

<v-row>
<v-btn
      @click="deleteBoard(item.boardid)"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-spacer/>
      <v-row>

    <v-checkbox
      v-model="item.public"

      :label="$t('public')"

      v-on:change="changePublic(item)"

    ></v-checkbox>
        <v-checkbox
      v-model="item.anonym"
      :label="$t('anonym')"
      v-on:change="changeAnonym(item)"
    ></v-checkbox>
  </v-row>

<v-btn
      @click="gotoBoard(item.boardid)"
    >
      <v-icon>mdi-eye</v-icon>
    </v-btn>
</v-row>
         

 <br>
 <v-divider inset/>
 
          </v-container>
</div>
<div v-else>
        <v-list-item
          v-for="(item, i) in boards"
          :key="i"

          
        >
        <v-list-item-content @click="gotoBoard(item.boardid)" >
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
</v-list-item-content>
        </v-list-item>
</div>



        <v-list-item v-if="user=='me' && boards.length<10 && !newBoardTemplate">
<v-btn
      @click="newBoardTemplate=true"
 block   >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-list>




          <form
        accept-charset="UTF-8"
        v-on:submit.prevent="sumbitNewBoard()"
v-if="newBoardTemplate"
      >  

 <v-divider inset></v-divider>

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
        newIsAnonym:false
      }
    },

props:{
    user:{
        required:true
    },


  },
  methods:{

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
},
sumbitNewBoard(){


    this.$axios.post('/newboard',
    {'title':this.newTitle,'description':this.newDescription,'public':this.newIsPublic,'anonym':this.newIsAnonym}
    ).then(response => { 

   this.boards.push({'boardid':response.data.boardid,'title':this.newTitle,'description':this.newDescription})
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
