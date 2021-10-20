<template>
<body   >
	<div id="page" style="background-color:white;">
		<div id="mainActions"
			style="width:100%;padding-top:8px;padding-bottom:8px;padding-left:16px;">
			<!--
			<input id="ParallelEdge"
       type="button"
       value="Parallel Edge"> -->
       
        <v-btn x-small id="OrganicLayout" v-if="editmode"
       >{{$t('organic_layout')}}</v-btn>

	           <v-btn x-small id="cut" v-if="editmode"
       >{{$t('cut')}}</v-btn>

	   	           <v-btn x-small id="copy" v-if="editmode"
       >{{$t('copy')}}</v-btn>
       
	   	           <v-btn x-small id="paste" v-if="editmode"
       >{{$t('paste')}}</v-btn>


	   	           <v-btn x-small id="delete" v-if="editmode"
       >{{$t('delete')}}</v-btn>

	   	   	           <v-btn x-small id="undo" v-if="editmode"
       >{{$t('undo')}}</v-btn>

	   	   	           <v-btn x-small id="redo" v-if="editmode"
       >{{$t('redo')}}</v-btn>

	   	   	           <v-btn x-small id="print"
       >{{$t('print')}}</v-btn>

	   	   	           <v-btn x-small id="show"
       >{{$t('show')}}</v-btn>

<!--
        <input id="debug"
       type="button"
       value="debug">
	   -->
			
		</div>
		

		
         
		<table border="0" width="width:100%">

			<tr>
			
			
			
				<td id="toolbar" style="width:16px;" valign="top">
		
								<!-- Toolbar Here -->				
				</td>
				

				
				<td valign="top" style="border-width:1px;border-style:solid;border-color:black;">
				
				
				
					<div id="outlineContainer"
         style="z-index:1;position:absolute;overflow:hidden;width:160px;height:120px;background:transparent;border-style:solid;border-color:lightgray;">	</div>
			
				
				
					<div id="graph" tabindex="-1" style="position:relative;height:580px;width:784px;overflow:hidden;cursor:default;">
						<!-- Graph Here -->
						<center id="splash" style="padding-top:230px;">
							<img src="images/loading.gif">
						</center>






		

					</div>
					
					

<!--

					<textarea id="xml" style="height:480px;width:684px;display:none;border-style:none;"></textarea>
					-->
				</td>
			</tr>
			
		     
		</table>
		
<!--

		<span >
			<input id="source" type="checkbox"/>Source
		</span>
		-->
    

<div style="padding-left:16px;">

	           <v-btn x-small id="zoomIn"
       >{{$t('zoomIn')}}</v-btn>

	   	           <v-btn x-small id="zoomOut"
       >{{$t('zoomOut')}}</v-btn>

	   	           <v-btn x-small id="actualSize"
       >{{$t('actualSize')}}</v-btn>

	   	           <v-btn x-small id="fit"
       >{{$t('fit')}}</v-btn>
	   

<v-btn v-if="editmode" id="saveid"   >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
	</div>

	</div>

	
	<div :gotoCell="gotoCell" v-if="showSuggestion">
<v-btn
      @click="FshowSuggestion()" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Suggest :callback="closeSuggestion" :cellId="cellId" :boardId="boardId" />
	</div>

	<!-- report cell -->
<div v-if="showReport">
<v-btn
      @click="FshowReport()" 
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <Report :callback="cellReported" reportType="cell" :cellId="cellId" :id="boardId" />
	</div>
</body>

</template>

<script>
export default {
	/*
  head: {
	  
    script: [
      // Supported since Nuxt 1.0
      { src: '/mxgraph/mxClient.js', 
	   defer: true,
	  	  callback: () => {this.loaded=true}		},
      { src: '/mxgraph/examples/editors/js/app.js',	  },
    ],
//	__dangerouslyDisableSanitizers: ['script']
	
  },

*/


props:{
    xml:{
        type:String,
        required:true
    },
	editmode:{
		type:Boolean,
		required:true,
	},
	boardId:{
		type:Number,
		required:true
	},
	gotoCell:{
		type:Object,
		required:true
	}


  },
	          data() {
    return {
      loaded: false,
	   showReport: false,
	   reportCell:null,
	   cellId:null,
	   showSuggestion:false,

    }
			  },

			  methods:{
				  FshowSuggestion(){
					  this.showSuggestion=false
				  },
				  
				  FshowReport(){
					  this.showReport=false
				  },

				  closeSuggestion(){
					  this.showSuggestion=false;
					  
				  },

				  cellReported(){
					  this.showReport=false;
				  },

saveCallback(xml){

  this.$axios.post('/updateboardcontent/'+this.boardId,
 {'xml':xml} 
  ).then(response => { 

        
      this.$notifier.showMessage({ content:this.$t('saved'), color: 'info' })

}
)
.catch(error => {
      this.$notifier.showMessage({ content:this.$t('error'), color: 'error' })

});

},
reportCallback(id) {
	this.cellId=parseInt(id);
	this.showReport=true;
	

},
suggestCallback(id) {
this.cellId=parseInt(id);
this.showSuggestion=true;
},



			  },
  

    created() {
		
      let mxScript = document.createElement('script')
      mxScript.src='mxgraph/mxClient.js'
	  let currentXml=this.xml
	  let currentEditMode=this.editmode
	  let save=this.saveCallback
	  let reportCall=this.reportCallback
	  let suggestCall=this.suggestCallback
	  let loggedin=this.$auth.loggedIn

	  let gotoc=this.gotoCell

		let xmlfile;
		if (this.editmode){
			xmlfile='mxgraph/examples/editors/config/diagrameditor.xml'
		} else {
			xmlfile='mxgraph/examples/editors/config/simplediagrameditor.xml'
		}

	  mxScript.onload = function(){

     
	let appScript = document.createElement('script')
	      appScript.src= 'mxgraph/examples/editors/js/app.js'
document.head.appendChild(appScript)
	appScript.onload= function(){
		
	createEditor(xmlfile,currentXml,currentEditMode,save,reportCall,suggestCall,gotoc,loggedin)
}
	  }
	  document.head.appendChild(mxScript)


	//  appScript.innerHTML=`createEditor('/mxgraph/examples/editors/config/diagrameditor.xml','${escape(this.xml)}')`

	
		
/*
		let test = document.createElement('script')
		test.innerHTML=`createEditor('/mxgraph/examples/editors/config/diagrameditor.xml','${escape(this.xml)}')`
		document.head.appendChild(test)
		
*/
    },

}

</script>
<style lang="scss">
</style>