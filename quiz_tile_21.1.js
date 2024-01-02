// JavaScript Document
function quizTileSetup(){
    
    
    $("fieldset div[id^=radio]").each(function(indx){
                                      
                $(this).prev().addClass("quizLabel activeLabel");
        if($(".q_option_"+(indx+1)).length>0){
            
            var nwWidth=$(".q_option_"+(indx+1)).width();
            var nwHeight=$(".q_option_"+(indx+1)).height();
            if($(".q_option_"+(indx+1)).attr("id").indexOf("shape")>-1){
              
                nwWidth=nwWidth-1;
                nwHeight=nwHeight-1;
                
            }
			$(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).css('top'), "left": $(".q_option_"+(indx+1)).css('left')});
        }
                                      })
    
    $('fieldset input[type="radio"]').click(function(){
        $(".selQuizOption").removeClass("selQuizOption");
        $("fieldset input:radio:checked").parent().prev().addClass("selQuizOption");
    })
		
		$('label').mousedown(function(){
        
		//testId=setTimeout(function(){console.log("Mouse down");$("input:radio").blur();},200)
       
    })
		
    $('fieldset input[type="radio"]').focus(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
         $(this).parent().prev().find("label").addClass("focusQuizOpt");
    })
     $('fieldset input[type="radio"]').focusout(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        
       
    })


   $("fieldset div[id^=check]").each(function(indx){
                                      
                $(this).prev().addClass("quizLabel activeLabel");
                 if($(".q_option_"+(indx+1)).length>0){
            
            var nwWidth=$(".q_option_"+(indx+1)).width();
            var nwHeight=$(".q_option_"+(indx+1)).height();
            if($(".q_option_"+(indx+1)).attr("id").indexOf("shape")>-1){
              
                nwWidth=nwWidth-1;
                nwHeight=nwHeight-1;
                
            }
                //$(this).prev().css({"width": nwWidth, "height": nwHeight, "left": $(".q_option_"+(indx+1)).css('left')});
				console.log("index+1" +(indx+1))
				$(this).prev().css({"width": nwWidth, "height": nwHeight, "top": $(".q_option_"+(indx+1)).css('top'), "left": $(".q_option_"+(indx+1)).css('left')});
        }
                                      
                                      })
    
    $('input[type="checkbox"]').click(function(){
        $(".selQuizOption").removeClass("selQuizOption");
        $(".selQuizOption").removeClass("activeLabel");
       // $("input:checkbox").blur();
       // $(this).parent().prev().blur();
        $("input:checkbox:checked").parent().prev().addClass("selQuizOption");
        
    
    })
    
    $('input[type="checkbox"]').focus(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        $(this).parent().prev().find("label").addClass("focusQuizOpt");
    })
    $('input[type="checkbox"]').focusout(function(){
        $(".focusQuizOpt").removeClass("focusQuizOpt");
        
       
    })
     
$("input:checkbox").prop('checked', false);
  $(".selQuizOption").removeClass("selQuizOption");  
	removehighlightBg();
    
}

function getScale(){
   return 1; 
  /*  var div=$('#pageDIV').css('transform');
var values = div.split('(')[1];
values = values.split(')')[0];
values = values.split(',');
var a = values[0];
var b = values[1];

var scale = Math.sqrt(a*a + b*b);
    return 1/scale;*/
}


//Custom for option highlight 14th Apr 2022
function highlightBg(count1)
{
	var OptionLength = count1.split(",");
	
	for(i=0;i<OptionLength.length;i++)
		{			
			$('.'+OptionLength[i]+' label').addClass("correctLabel");
		}
	
	
}

function removeHighlightBgQuizLevel(count1)
{
	var OptionLength = count1.split(",");
	
	for(i=0;i<OptionLength.length;i++)
		{			
			$('.'+OptionLength[i]+' label').removeClass("correctLabel");
		}
	
	
}



function removehighlightBg()
{	
	$('[id^="label"]').removeClass("correctLabel");
	
}



function highlightImg(count)
{
	$('[start='+count+']').css("background-image", "url(bg_color5_20_20.png)");
}



