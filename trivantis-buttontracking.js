function ButtonTrackingObj(exp, titleName, cm, frame){
   this.VarTrivBtnTracking = new Variable( 'VarTrivBtnTracking', null, 0, cm, frame, exp, titleName, true );
   this.title = null;
}

ButtonTrackingObj.codeToStateMap =
{
	'N' : 'normalState',
	'O' : 'overState',
	'D' : 'downState',
	'A' : 'disabledState',
	'V' : 'visitedState',
	'S' : 'selectedState'
};
ButtonTrackingObj.stateToCodeMap = {};
for (var key in ButtonTrackingObj.codeToStateMap)
	ButtonTrackingObj.stateToCodeMap[ButtonTrackingObj.codeToStateMap[key]] = key;

ButtonTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivBtnTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split(',');
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var status = arrStatus[i];
			        var node = this.FindNode( this.title, id );
			        if( node )
						node.v = ButtonTrackingObj.codeToStateMap[status] || status;
		        }
    		}
        }
    } catch (e) { }
}

ButtonTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

ButtonTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		return 'normalState';
	}
}


ButtonTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );

	return status;
}


ButtonTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

ButtonTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

ButtonTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

ButtonTrackingObj.prototype.SavePageTracking = function()
{
	var fnIsSaveState = window.ObjButton && ObjButton.isSaveState || function () { return false; };
	var hexString = '';
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree(function(node, i, stack){
		if (fnIsSaveState(node.v))
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
		hexString += (i > 0 ? ',' : '') + arrayIds[i].toString(16);

	hexString += (arrayIds.length > 0 ? '#' : '');
	
	for (var i = 0; i < arrayStatus.length; i++)
		hexString += (i > 0 ? ',' : '') + (ButtonTrackingObj.stateToCodeMap[arrayStatus[i]] || arrayStatus[i]);
	
	this.VarTrivBtnTracking.set(hexString);
}

var trivBtnTracking = new ButtonTrackingObj(365,'ml_vertical_scrolling_poc', 0, null);
trivBtnTracking.title={id:1,v:0,c:[{id:217453,v:'normalState'},{id:26772,v:'normalState'},{id:26932,v:'normalState'},{id:76841,v:'normalState'},{id:117188,v:'normalState'},{id:79960,v:'normalState'},{id:122726,v:'normalState'},{id:82155,v:'normalState'},{id:123147,v:'normalState'},{id:101781,v:'normalState'},{id:195637,v:'normalState'},{id:105164,v:'normalState'},{id:105438,v:'normalState'},{id:105591,v:'normalState'},{id:105813,v:'normalState'},{id:31776,v:'normalState'},{id:232456,v:'normalState'},{id:232505,v:'normalState'},{id:232515,v:'normalState'},{id:232712,v:'normalState'},{id:232730,v:'normalState'},{id:232783,v:'normalState'},{id:232801,v:'normalState'},{id:232892,v:'normalState'},{id:232943,v:'normalState'},{id:232959,v:'normalState'},{id:232989,v:'normalState'},{id:233110,v:'normalState'},{id:235330,v:'normalState'},{id:235379,v:'normalState'},{id:235389,v:'normalState'},{id:235586,v:'normalState'},{id:235604,v:'normalState'},{id:235657,v:'normalState'},{id:235675,v:'normalState'},{id:235694,v:'normalState'},{id:235732,v:'normalState'},{id:235748,v:'normalState'},{id:235778,v:'normalState'},{id:235839,v:'normalState'},{id:237358,v:'normalState'},{id:237407,v:'normalState'},{id:237417,v:'normalState'},{id:237614,v:'normalState'},{id:237632,v:'normalState'},{id:237685,v:'normalState'},{id:237703,v:'normalState'},{id:237722,v:'normalState'},{id:237760,v:'normalState'},{id:237776,v:'normalState'},{id:237806,v:'normalState'},{id:237867,v:'normalState'},{id:156201,v:'normalState'}]};
