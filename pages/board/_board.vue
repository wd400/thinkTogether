<template>

<v-row align="stretch">


<div>

    <client-only>
    <XmlViewer :gotoCell="gotoCell" :boardId="boardId" :editmode="owned" :xml="xml" v-if="xml!=null && owned!=null"/>
  
    </client-only>

</div>           
<v-col >
    <v-col align-self="stretch">

<v-row align="center" :dense="true">
<v-btn  icon
   @click="gotoUser()"  v-if="! owned && userid!=null" >
      <v-icon >mdi-account</v-icon>
         </v-btn>
    <h3 v-if="loaded">{{cat2text[cat]}}</h3>
</v-row>
<h2>{{title}}</h2>
<v-divider/>
           <h4 style="white-space: pre-wrap;">{{description}} </h4>
     
     <!-- report board -->
     <v-btn x-small
      @click="TShowReport()" v-if="! owned && !showReport && $auth.loggedIn && loaded" 
    >
      <v-icon>mdi-flag</v-icon>
    </v-btn>
    
    <div v-if="showReport">
<v-btn x-small icon
      @click="FShowReport()" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Report :callback="boardReported" reportType="board" :id="boardId" />


	</div>
    
    <br>
     <ListSuggestion :gotoCell="gotoCell" :boardId="boardId" v-if="owned" />
<br>
    <InvitedList :boardid="boardId" v-if="owned" />
</v-col>

</v-col>




<!--<Suggestions v-if="!isauthor" :boardid="boardid" />-->
</v-row>



</template>

<script>
import UserAuthForm from '@/components/UserAuthForm.vue'

export default {
    components: {
        UserAuthForm
    },
    created() {
       window.addEventListener('beforeunload', this.beforeWindowUnload)



      if (this.$route.params.board=="random") {

this.boardId="random"

      } else {
     var tmpboardId = Number(this.$route.params.board)
     if (isNaN(tmpboardId)) {

       this.$router.push('/')
     } else {
        this.boardId=tmpboardId
     }
    
      }
    },
          data() {
    return {
      isauthor: null,
      xml:null,
      initialxml:null,
      owned:null,
      userid:null,
      title:null,
      description:null,
      boardid:null,
      showReport:false,
      gotoCell:{},
      loaded:false,
      cat:null,
          cat2text:{
      0:this.$t('other'),
      1:this.$t('general_reflection'),
      2:this.$t('personal_reflection'),
      3:this.$t('science')
    },

    }
  },
         
     mounted(){

  this.$axios.get('/board/'+this.boardId).then(response => { 

this.owned=response.data.owned;
//this.owned=false;
this.userid=response.data.userid;
this.title=response.data.title;
this.description=response.data.description;
this.xml=response.data.xml;
this.cat=response.data.cat;

if (this.boardId=="random"){
  this.boardId=response.data.boardid
history.replaceState(
    {},
    null,
     '#' +'/board/'+response.data.boardid
  )

 // this.$route.path='/board/'+response.data.boardid
}
this.loaded=true;
//this.xml='<mxGraphModel>  <root>    <Diagram label="My Diagram" href="http://www.jgraph.com/" id="0">      <mxCell />    </Diagram>    <Layer label="Default Layer" id="1">      <mxCell parent="0" />    </Layer>    <Rect label="Rectangle" href="" id="2">      <mxCell vertex="1" parent="1">        <mxGeometry x="440" y="50" width="80" height="40" as="geometry" />      </mxCell>    </Rect>    <Rect label="Rectangle" href="" id="3">      <mxCell vertex="1" parent="1">        <mxGeometry x="280" y="190" width="80" height="40" as="geometry" />      </mxCell>    </Rect>    <Connector label="" href="" id="4">      <mxCell edge="1" parent="1" source="2" target="3">        <mxGeometry relative="1" as="geometry" />      </mxCell>    </Connector>  </root></mxGraphModel>'

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


     },

     methods:{
       TShowReport(){
this.showReport=true
       },
              FShowReport(){
this.showReport=false
       },
       gotoUser() {
         if (this.owned){
this.$router.push('/user/me')
         } else {
  this.$router.push('/user/'+this.userid)
         }
},
				  boardReported(){
					  this.showReport=false;
				  },

     }
}
</script>

<style scoped>

</style>
