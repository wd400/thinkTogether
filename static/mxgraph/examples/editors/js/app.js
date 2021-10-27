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
			//	alert(location.pathname+config)
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

				function selectOnly()
				{
					editor.graph.setCellsLocked(true)
					editor.graph.setConnectable(false)
					editor.graph.createEdges = false;
				editor.graph.editEdges =false;;
				editor.graph.setCellsDeletable(false)
					editor.graph.editVertices = false;;
			//		editor.graph.cloneCells = false;;
				};

			
				//change menu
				if (loggedin){
				if (editmode){
					//editor.graph.setEnabled(true);
				
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

		//			editor.graph.setEnabled(false);
		//			editor.graph.cellRenderer.forceControlClickHandler=true
		selectOnly()	
					
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

//				editor.graph.setEnabled(false);
//				editor.graph.cellRenderer.forceControlClickHandler=true
selectOnly()				
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

/*
editor.graph.addListener(mxEvent.CLICK, function (evt) {
	alert('ici')
	editor.graph.popupMenuHandler.hideMenu()

});
*/

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

gotocell.quit= function(){

	editor.graph.popupMenuHandler.hideMenu();
}



				var doc = mxUtils.parseXml(xml);
				var codec = new mxCodec(doc);
			//	alert(doc.documentElement)
				codec.decode(doc.documentElement,editor.graph.getModel())

				editor.graph.refresh()
		    	hideSplash();



				editor.graph.setPanning(true);

				
				// Enables rubberband selection
			//	new mxRubberband(editor.graph);
				













				// Public helper method for shared clipboard.
				mxClipboard.cellsToString = function(cells)
				{
					var codec = new mxCodec();
					var model = new mxGraphModel();
					var parent = model.getChildAt(model.getRoot(), 0);
					
					for (var i = 0; i < cells.length; i++)
					{
						model.add(parent, cells[i]);
					}

					return mxUtils.getXml(codec.encode(model));
				};

				// Focused but invisible textarea during control or meta key events
				var textInput = document.createElement('textarea');
			
			
				mxUtils.setOpacity(textInput, 0);
				textInput.style.width = '1px';
				textInput.style.height = '1px';
				var restoreFocus = false;
				var gs = editor.graph.gridSize;
				var lastPaste = null;
				var dx = 0;
				var dy = 0;

				// Workaround for no copy event in IE/FF if empty
				textInput.value = ' ';

				function getSelText()
{
    if (window.getSelection)
    {
        return window.getSelection();
    }
    else if (document.getSelection)
    {
        return document.getSelection();
    }
    else if (document.selection)
    {
        return document.selection.createRange().text;
    }
    else return "";
}
			
				// Shows a textare when control/cmd is pressed to handle native clipboard actions
				mxEvent.addListener(document, 'keydown', function(evt)
				{
					// No dialog visible
					var source = mxEvent.getSource(evt);
			//		alert(getSelText())
					if (editor.graph.isEnabled() && !editor.graph.isMouseDown && !editor.graph.isEditing() && source.nodeName != 'INPUT' && getSelText() == "")
					{
						if (evt.keyCode == 224 || (!mxClient.IS_MAC && evt.keyCode == 17 ) ||
							(mxClient.IS_MAC && (evt.keyCode == 91 || evt.keyCode == 93)))
						{
							// Cannot use parentNode for check in IE
							if (!restoreFocus)
							{
								// Avoid autoscroll but allow handling of events
								textInput.style.position = 'absolute';
								textInput.style.left = (editor.graph.container.scrollLeft + 10) + 'px';
								textInput.style.top = (editor.graph.container.scrollTop + 10) + 'px';
								editor.graph.container.appendChild(textInput);

								restoreFocus = true;
								textInput.focus();
								textInput.select();
							}
						}
					}
				});
				
				// Restores focus on graph container and removes text input from DOM
				mxEvent.addListener(document, 'keyup', function(evt)
				{
					if (restoreFocus && (evt.keyCode == 224 || evt.keyCode == 17 ||
						evt.keyCode == 91 || evt.keyCode == 93 ))
					{
						restoreFocus = false;
						
						if (!editor.graph.isEditing())
						{
							editor.graph.container.focus();
						}
						
						textInput.parentNode.removeChild(textInput);
					}
				});
				
				// Inserts the XML for the given cells into the text input for copy
				var copyCells = function(graph, cells)
				{
					if (cells.length > 0)
					{
						var clones = graph.cloneCells(cells);
						
						// Checks for orphaned relative children and makes absolute
						for (var i = 0; i < clones.length; i++)
						{
							var state = graph.view.getState(cells[i]);
							
							if (state != null)
							{
								var geo = graph.getCellGeometry(clones[i]);
								
								if (geo != null && geo.relative)
								{
									geo.relative = false;
									geo.x = state.x / state.view.scale - state.view.translate.x;
									geo.y = state.y / state.view.scale - state.view.translate.y;
								}
							}
						}
						
						textInput.value = mxClipboard.cellsToString(clones);
					}
					
					textInput.select();
					lastPaste = textInput.value;
				};
				
				// Handles copy event by putting XML for current selection into text input
				mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function(evt)
				{
					if (editor.graph.isEnabled() && !editor.graph.isSelectionEmpty())
					{
						
						copyCells(editor.graph, mxUtils.sortCells(editor.graph.model.getTopmostCells(editor.graph.getSelectionCells())));
						
						dx = 0;
						dy = 0;
					}
				}));
			
				if (editmode) {
				// Handles cut event by removing cells putting XML into text input
				mxEvent.addListener(textInput, 'cut', mxUtils.bind(this, function(evt)
				{
					if (editor.graph.isEnabled() && !editor.graph.isSelectionEmpty())
					{
						copyCells(editor.graph, editor.graph.removeCells());
						dx = -gs;
						dy = -gs;
					}
				}));
			}
				
				// Merges XML into existing graph and layers
				var importXml = function(xml, dx, dy)
				{
					dx = (dx != null) ? dx : 0;
					dy = (dy != null) ? dy : 0;
					var cells = []

					try
					{
						var doc = mxUtils.parseXml(xml);
						var node = doc.documentElement;
						
						if (node != null)
						{
							var model = new mxGraphModel();
							var codec = new mxCodec(node.ownerDocument);
							codec.decode(node, model);
							
							var childCount = model.getChildCount(model.getRoot());
							var targetChildCount = editor.graph.model.getChildCount(editor.graph.model.getRoot());
							
							// Merges existing layers and adds new layers
							editor.graph.model.beginUpdate();
							try
							{
								for (var i = 0; i < childCount; i++)
								{
									var parent = model.getChildAt(model.getRoot(), i);
									
									// Adds cells to existing layers if not locked
									if (targetChildCount > i)
									{
										// Inserts into active layer if only one layer is being pasted
										var target = (childCount == 1) ? editor.graph.getDefaultParent() : editor.graph.model.getChildAt(editor.graph.model.getRoot(), i);
										
										if (!editor.graph.isCellLocked(target))
										{								
											var children = model.getChildren(parent);
											cells = cells.concat(editor.graph.importCells(children, dx, dy, target));
										}
									}
									else
									{
										// Delta is non cascading, needs separate move for layers
										parent = editor.graph.importCells([parent], 0, 0, editor.graph.model.getRoot())[0];
										var children = editor.graph.model.getChildren(parent);
										editor.graph.moveCells(children, dx, dy);
										cells = cells.concat(children);
									}
								}
							}
							finally
							{
								editor.graph.model.endUpdate();
							}
						}
					}
					catch (e)
					{
						alert(e);
						throw e;
					}
					
					return cells;
				};
				
				// Parses and inserts XML into graph
				var pasteText = function(text)
				{
					var xml = mxUtils.trim(text);
					var x = editor.graph.container.scrollLeft / editor.graph.view.scale - editor.graph.view.translate.x;
					var y = editor.graph.container.scrollTop / editor.graph.view.scale - editor.graph.view.translate.y;
					
					if (xml.length > 0)
					{
						if (lastPaste != xml)
						{
							lastPaste = xml;
							dx = 0;
							dy = 0;
						}
						else
						{
							dx += gs;
							dy += gs;
						}
								
						// Standard paste via control-v
						if (xml.substring(0, 14) == '<mxGraphModel>')
						{
							editor.graph.setSelectionCells(importXml(xml, dx, dy));
							editor.graph.scrollCellToVisible(editor.graph.getSelectionCell());
						}
					}
				};
				
				// Cross-browser function to fetch text from paste events
				var extractGraphModelFromEvent = function(evt)
				{
					var data = null;
					
					if (evt != null)
					{
						var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData;
						
						if (provider != null)
						{
							if (document.documentMode == 10 || document.documentMode == 11)
							{
								data = provider.getData('Text');
							}
							else
							{
								data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ? provider.getData('text/html') : null;
							
								if (mxUtils.indexOf(provider.types, 'text/plain' && (data == null || data.length == 0)))
								{
									data = provider.getData('text/plain');
								}
							}		
						}
					}
					
					return data;
				};

				if (editmode) {
				// Handles paste event by parsing and inserting XML
				mxEvent.addListener(textInput, 'paste', function(evt)
				{

					// Clears existing contents before paste - should not be needed
					// because all text is selected, but doesn't hurt since the
					// actual pasting of the new text is delayed in all cases.
					textInput.value = '';

					if (editor.graph.isEnabled())
					{
						var xml = extractGraphModelFromEvent(evt);

						if (xml != null && xml.length > 0)
						{
							pasteText(xml);
						}
						else
						{
							// Timeout for new value to appear
							window.setTimeout(mxUtils.bind(this, function()
							{
								pasteText(textInput.value);
							}), 0);
						}
					}
		
					textInput.select();
				});
			}


			/*
			const latexScript ='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML'
	  
			let appScript = document.createElement('script')
			appScript.src=latexScript
			appScript.onload=function(){
				

				editor.graph.addListener(mxEvent.EDITING_STOPPED, function (evt) {
					alert(evt)
					window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,document.getElementById('page')])
		//	window.MathJax.typeset()
			//		editor.graph.popupMenuHandler.hideMenu()
				
				});
			};
			document.head.appendChild(appScript)
*/




			//		loadScript(latexScript)



				editor.graph.setCellsSelectable(true)





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
			mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
			
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
