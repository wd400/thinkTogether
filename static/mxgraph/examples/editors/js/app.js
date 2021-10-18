/*
 * Copyright (c) 2006-2013, JGraph Ltd
 *
 * Defines the startup sequence of the application.
 */


	/**
	 * Constructs a new application (returns an mxEditor instance)
	 */
	 function createEditor(config,xml,editmode,saveXML,reportCall,suggestCall,gotocell,loggedin)
	{
		var editor = null;
	//	alert("createEditor")


	gotocell.function=function(id)
	{

	if (id==null){
		editor.graph.clearSelection();
		return
	}
	var model = editor.graph.getModel();
	var cell=model.getCell(id);
//	cell=editor.graph.getDefaultParent();
	console.log(cell);
	if (cell!=null && cell.geometry != null){
	
	editor.graph.clearSelection();
	editor.graph.setSelectionCell(cell);
	editor.graph.scrollCellToVisible(cell,true);
	// editor.graph.view.refresh(cell);
	} else {
	alert("Cell deleted");
	}
	
	}



		
		var hideSplash = function()
		{
			// Fades-out the splash screen
			var splash = document.getElementById('splash');
			
			if (splash != null)
			{
				try
				{
					mxEvent.release(splash);
					mxEffects.fadeOut(splash, 100, true);
				}
				catch (e)
				{
					splash.parentNode.removeChild(splash);
				}
			}
		};
		try
		{
			if (!mxClient.isBrowserSupported())
			{
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				mxObjectCodec.allowEval = true;
				var node = mxUtils.load(config).getDocumentElement();
				
				editor = new mxEditor(node);
				mxObjectCodec.allowEval = false;
				
				// Adds active border for panning inside the container
				
				editor.graph.createPanningManager = function()
				{
					var pm = new mxPanningManager(this);
					pm.border = 30;
					
					return pm;
				};
				
				editor.graph.allowAutoPanning = true;
				editor.graph.timerAutoScroll = true;
				
				// Updates the window title after opening new files
				/*
				var title = document.title;
				var funct = function(sender)
				{
					document.title = title + ' - ' + sender.getTitle();
				};
				editor.addListener(mxEvent.OPEN, funct);
				
				// Prints the current root in the window title if the
				// current root of the graph changes (drilling).
				editor.addListener(mxEvent.ROOT, funct);
				funct(editor);
				
				// Displays version in statusbar
			editor.setStatus('mxGraph '+mxClient.VERSION);
*/
				// Shows the application

				//change menu
				if (loggedin){
				if (editmode){
					editor.graph.setEnabled(true);
editor.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
{
  if(cell!=null &&(cell.edge||cell.vertex)) {
      menu.addItem('Change color', null, function()
      { 
      
 //     editor.execute('properties', cell);
 //     mxCellTracker(graph, color, funct);
               editor.execute('fillColor', cell);
      
      })


  }

} 
				} else{

					editor.graph.setEnabled(false);
		     
					
					editor.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
					{
					  if(cell!= null && cell.vertex) {
						  menu.addItem('Suggest', null, function()
						  { 
						  
							suggestCall(cell.id)
					 //     editor.execute('properties', cell);
					 //     mxCellTracker(graph, color, funct);
							//	   editor.execute('fillColor', cell);
						  
						  })

						  menu.addItem('Report', null, function()
						  { 
							  reportCall(cell.id)
						  
					 //     editor.execute('properties', cell);
					 //     mxCellTracker(graph, color, funct);
							//	   editor.execute('fillColor', cell);
						  
						  })
					
					
					  }
					
					}


				}
			}else {
				editor.graph.popupMenuHandler.factoryMethod =null

				editor.graph.setEnabled(false);
			}

				if (editmode){
					var first = new mxFastOrganicLayout(editor.graph);
					// alert(first);
					 first.forceConstant=150;
					 first.minDistanceLimit=5;
					 first.maxIterations=2000;
					 
									 mxEvent.addListener(document.getElementById("OrganicLayout"), 'click', function(evt)
								 {
								 
								 first.execute(editor.graph.getDefaultParent());
								 
								 });
				 
				}


				if (editmode){
					var buttons = ['cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show','zoomIn','zoomOut','actualSize','fit'];
				
				} else {
					var buttons = [ 'print', 'show','zoomIn','zoomOut','actualSize','fit'];
				
				}
			
				// Only adds image and SVG export if backend is available
				// NOTE: The old image export in mxEditor is not used, the urlImage is used for the new export.
				
							for (var i = 0; i < buttons.length; i++)
				{
					var button = document.getElementById(buttons[i]);
				//	mxUtils.write(button, mxResources.get(buttons[i]));
				
					var factory = function(name)
					{
						return function()
						{
							editor.execute(name);
						};
					};


				mxEvent.addListener(button, 'click', factory(buttons[i]));


			//		node.appendChild(button);
				}


				if (editmode){
				mxEvent.addListener(document.getElementById("saveid"), 'click', function()
				{
					var enc = new mxCodec();
					var node = enc.encode(editor.graph.getModel());
saveXML(mxUtils.getPrettyXml(node));
				}
				
				);
				}


						    // Changes the zoom on mouseWheel events
							/*
							mxEvent.addMouseWheelListener(function (evt, up)
							{
								if (!mxEvent.isConsumed(evt))
								{
									if (up)
									{
										editor.execute('zoomIn');
									}
									else
									{
										editor.execute('zoomOut');
									}
									
									mxEvent.consume(evt);
								}
							});
*/

				var doc = mxUtils.parseXml(xml);
				var codec = new mxCodec(doc);
			//	alert(doc.documentElement)
				codec.decode(doc.documentElement,editor.graph.getModel())

				editor.graph.refresh()
				hideSplash();
				
			}
		}
		catch (e)
		{
			hideSplash();

			// Shows an error message if the editor cannot start
			mxUtils.alert('Cannot start application: ' + e.message);
			throw e; // for debugging
		}

		return editor;
	}


	function onInit(editor)
		{
			// Enables rotation handle
			mxVertexHandler.prototype.rotationEnabled = false;

			// Enables guides
			mxGraphHandler.prototype.guidesEnabled = true;
			
		    // Alt disables guides
		    mxGuide.prototype.isEnabledForEvent = function(evt)
		    {
		    	return !mxEvent.isAltDown(evt);
		    };
		    
		    
		//     editor.graph.setEnabled(true);
		     
		     
	//	  editor.graph.setDragEnabled(true);
		    
		    // add outline
		    var outline = document.getElementById('outlineContainer');
		    new mxOutline(editor.graph, outline);
		//	editor.showOutline();
			




//editor.graph.autoSizeCells=true;

//auto resize
	editor.graph.autoSizeCellsOnAdd = true;


var cellLabelChanged = editor.graph.cellLabelChanged;
				editor.graph.cellLabelChanged = function(cell, newValue, autoSize)
				{	
		//	  alert(autoSize);
				autoSize=true;
					cellLabelChanged.apply(this, arguments);
						// editor.graph.updateCellSize(cell, true);
				};
				
				
				
				
				
				
				
				
				
				
				
			
			// Enables snapping waypoints to terminals
			mxEdgeHandler.prototype.snapToTerminals = true;
			
			// Defines an icon for creating new connections in the connection handler.
			// This will automatically disable the highlighting of the source vertex.
			mxConnectionHandler.prototype.connectImage = new mxImage('/images/connector.gif', 16, 16);
			
			// Enables connections in the graph and disables
			// reset of zoom and translate on root change
			// (ie. switch between XML and graphical mode).
			editor.graph.setConnectable(true);

			// Clones the source if new connection has no target
			editor.graph.connectionHandler.setCreateTarget(true);
			


			// Updates the title if the root changes
	//		var title = document.getElementById('title');
			
			
			
			




    /*
    var second = new mxParallelEdgeLayout(editor.graph);
    second.spacing = 20;
    
    
    
    mxEvent.addListener(document.getElementById("ParallelEdge"), 'click', function(evt)
				{
				
				second.execute(editor.graph.getDefaultParent());
				
				});

*/


/*
    mxEvent.addListener(document.getElementById("debug"), 'click', function(evt)
				{
				
				
				var model = editor.graph.getModel();
				var cell=model.getCell(3);
			//	cell=editor.graph.getDefaultParent();
				console.log(cell);
				if (cell!=null){
				
				editor.graph.clearSelection();
				editor.graph.setSelectionCell(cell);
				editor.graph.scrollCellToVisible(cell,true);
				// editor.graph.view.refresh(cell);
				} else {
				alert("Cell deleted");
				}
				
				});


*/



    
    
  //  var layout = new mxCompositeLayout(editor.graph, [first, second], first);
  //  layout.execute(editor.graph.getDefaultParent());












			/*
			
			if (title != null)
			{
				var f = function(sender)
				{
					title.innerHTML = 'mxDraw - ' + sender.getTitle();
				};
				
				editor.addListener(mxEvent.ROOT, f);
				f(editor);
			}
			
			
			*/
			
			


			// Defines a new action to switch between
			// XML and graphical display
			/*
			var textNode = document.getElementById('xml');
			var sourceInput = document.getElementById('source');
			sourceInput.checked = false;
			*/
			var graphNode = editor.graph.container;
			
			

			var funct = function(editor)
			{
			/*
				if (sourceInput.checked)
				{
					graphNode.style.display = 'none';
					textNode.style.display = 'inline';
					
					var enc = new mxCodec();
					var node = enc.encode(editor.graph.getModel());
					
					textNode.value = mxUtils.getPrettyXml(node);
					textNode.originalValue = textNode.value;
					textNode.focus();
				}
				else
				*/
				{
					graphNode.style.display = '';
					
					if (textNode.value != textNode.originalValue)
					{
						var doc = mxUtils.parseXml(textNode.value);
						var dec = new mxCodec(doc);
						dec.decode(doc.documentElement, editor.graph.getModel());
					}

					textNode.originalValue = null;
					
					// Makes sure nothing is selected in IE
					
					if (mxClient.IS_IE)
					{
						mxUtils.clearSelection();
					}

					textNode.style.display = 'none';

					// Moves the focus back to the graph
					editor.graph.container.focus();
				}
			};
			/*
			editor.addAction('switchView', funct);
			
			// Defines a new action to switch between
			// XML and graphical display
			mxEvent.addListener(sourceInput, 'click', function()
			{
				editor.execute('switchView');
			});
			*/

			// Create select actions in page
			// var node = document.getElementById('mainActions');
			//'group', 'ungroup', 



			

			// Create select actions in page
			/*
			var node = document.getElementById('selectActions');
			mxUtils.write(node, 'Select: ');
			mxUtils.linkAction(node, 'All', editor, 'selectAll');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'None', editor, 'selectNone');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'Vertices', editor, 'selectVertices');
			mxUtils.write(node, ', ');
			mxUtils.linkAction(node, 'Edges', editor, 'selectEdges');
			*/



  }
