phoneLandscapeFlg = false;
tabletPortraitFlg = false;
//Duplicate fixpage div to create back div and place it before body in DOM
function restructureBackground() {
    if (!$('#backDIV').length){
        var backDIV = $('#fixDIV').clone().empty().attr('id', 'backDIV')[0];
        //backDIV.style["position"] = "absolute";
        document.body.insertBefore(backDIV, document.body.firstChild);
        
    }
}

//Reisze the backDIV to match the main pageDIV
function doResize() {
	$('#backDIV')[0].style.transform = $('#pageDIV')[0].style.transform;
	$('#backDIV')[0].style.left = $('#pageDIV')[0].style.left;
}
function doResizeBackDiv(){
	doResize();
	// The below timeout function is a fix for resizing with the maximise button which doesn't work without a delay. 
	setTimeout(function() {
		doResize();
		//$('#backDIV')[0].style.left = leftPos;
	}, 150);
};


// updates progress bar on top banner
window.onscroll = function() {updateProgressBar()};

function updateProgressBar() {
	var getWindow = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (getWindow / height) * 100;
  $(".progress-scroller").width(scrolled + "%");
  //console.log(scrolled)
}

// to reset the aria-hidden property to all slide of carousel section
function resetSlideAriaHidden() {
    $(".slide1").attr("aria-hidden","false");
    $(".slide2").attr("aria-hidden","false");
    $(".slide3").attr("aria-hidden","false");
    $(".slide4").attr("aria-hidden","false"); 
}

function setupOrientation(){
    
    
    try{
        
    doResizeBackDiv();
    
    if(is.isMobile.anyPhone()!=null){
		
		if((getOrientation() == "landscape") && !phoneLandscapeFlg){
               
        $(".rotationOverlay").show();
        
    
        }else{
        
        $(".rotationOverlay").hide();
  
        }
	}else if(is.isMobile.any()!=null){
		
		if((getOrientation() == "portrait") && !tabletPortraitFlg){
               
        $(".rotationOverlay").show();
        
    
        }else{
        
        $(".rotationOverlay").hide();
  
        }
		
		
		
	}
   
    }catch(e){console.log("error handling orientation.")}
    
}
/*

Code in progress to work out relative top position if fixing elements in place which are not at top: 0px
function fixInPlace(elems) {
    toFix = elems.toArray();
	toFix.forEach(function (elem) {
		console.log(elem.offsetTop);
		elem.style.top = '10px'
		})
}

function unFixPlace(elems) {
    toFix = elems.toArray();
	toFix.forEach(function (elem) {
		elem.style.top = ''
		})
}
*/
//VarcarouselPos.value == $(".carousel1")[0].offsetLeft