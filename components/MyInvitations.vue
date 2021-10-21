<template>

  <div
  >
 
    <v-list 
    
    style="max-height: 400px;min-width:200px"
   class="overflow-y-auto"
    
    >
                  <v-list-item-title class="text-h6" >
            {{$t('my_invitations')}}
            </v-list-item-title>
      <v-list-item-group 
        color="primary"
      >


<div>
        <v-list-item
          v-for="(item, i) in invitations"
          :key="i"

          
        >
         <v-list-item-content   @click="gotoBoard(item.boardid)">
                  <v-list-item-title v-text="item.title"  ></v-list-item-title>

</v-list-item-content>
        <v-list-item-action>
          <v-btn x-small icon  @click="quitBoard(item.boardid)"  >
            <v-icon >mdi-account-remove</v-icon>
          </v-btn>
        </v-list-item-action>
        </v-list-item>
</div>


      </v-list-item-group>
    </v-list>

  </div>
</template>


<script>

export default{
    data() {
      return {
        invitations:[],
}
    },


props:{
    

  },
  methods:{
      gotoBoard(boardid){

this.$router.push('/board/'+boardid)

      },
      quitBoard(boardid){


            this.$axios.get('/quitboard/'+boardid).then(response => { 


    for( var i = 0; i < this.invitations.length; i++){ 
    
        if ( this.invitations[i].boardid === boardid) { 
    
            this.invitations.splice(i, 1); 
            break;
        }

    
    }

this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })


}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

     


      }
},
     mounted(){
    //     alert(this.gotoCell)
     this.$axios.get('/myinvitations').then(response => { 


this.invitations=response.data;

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
