<template>

  <div
  >
 
    <v-list 
    
  
   class="overflow-y-auto"
    
    >
                  <v-list-item-title class="text-h6" >
            {{$t('invited')}}
            </v-list-item-title>
      <v-list-item-group 
        color="primary"
      >



        <v-list-item
          v-for="(item, i) in invited"
          :key="i"

          
        >
         <v-list-item-content   @click="gotoUser(item.userid)">
                  <v-list-item-title v-text="item.pseudo"  ></v-list-item-title>

</v-list-item-content>
        <v-list-item-action>
          <v-btn icon x-small  @click="uninvite(item.userid)"  >
            <v-icon >mdi-account-remove</v-icon>
          </v-btn>
        </v-list-item-action>
        </v-list-item>






      </v-list-item-group>
        <h5 v-if="invited.length==0">{{$t('no_guests')}}</h5>
             <v-text-field
 v-model="newPseudo"
            :label="$t('new_pseudo')"
            prepend-icon="mdi-account-plus"
            @keydown.enter="invite"
          ></v-text-field>
    </v-list>


  </div>
</template>


<script>

export default{
    data() {
      return {
        invited:[],
        newPseudo:null
}
    },


props:{
    boardid:{
        required:true,
        type:Number
    }
    

  },
  methods:{
      gotoUser(userid){

this.$router.push('/user/'+userid)

      },

      invite(){



            this.$axios.post(`/invite/${this.boardid}`,{'pseudo':this.newPseudo}).then(response => { 

        this.invited.push({'userid':response.data.userid,'pseudo':this.newPseudo})

        this.newPseudo=null

this.$notifier.showMessage({ content:this.$t('done'), color: 'info' })


}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});



      },
      uninvite(userid){


            this.$axios.get(`/uninvite/${this.boardid}/${userid}`).then(response => { 

            for( var i = 0; i < this.invited.length; i++){ 
    
        if ( this.invited[i].userid === userid) { 
    
            this.invited.splice(i, 1); 
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

this.$axios.get(`/listinvited/${this.boardid}`).then(response => { 

this.invited=response.data;

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
