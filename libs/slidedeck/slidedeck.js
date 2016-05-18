/*
* slideDeck.js
* JavaScript Document
* miles.thorogood@ubc.ca
* 2016
* the main guts of slidedeck.js development
* Some documentation is to be added
*/

"use strict";

window.onload = function() {
    readDeck();
    // processDeck(); which generaerate the behaviour is called at line 289, 
    // is there a better callback function we could use here?
}

//////////////////////////
//////////////////////////
// The slide deck beahviour
//////////////////////////
//////////////////////////

var codeBoxes = []; // for accessing code editors

var slideIndex = 0 ;
var slideBoxes = [] ;
var paging = true; // disable when editing because we want to use the arrow keys
var numbering = true ;

// On load get all the slides to paginate
// also get the code examples and assign a unique id
function processDeck() {
	window.scrollTo(0,0);
	slideBoxes = document.getElementsByClassName("slide-box"); 
   
    
	if(numbering){
		for(var i=0;i<slideBoxes.length;i++) {
			var newDiv = document.createElement("div"); 
			newDiv.setAttribute("class", "numbering");
			var newContent = document.createTextNode((i+1)); 
			newDiv.appendChild(newContent);
			slideBoxes[i].appendChild(newDiv);
			
		}
	}
    

	// go through all codeboxes give each codeedit and resultframe uids
	codeBoxes = document.getElementsByClassName("textareaCode");
	for(var i=0;i<codeBoxes.length;i++) {
		uid = guid() ;
		codeBoxes[i].setAttribute("id", uid);
		codeBoxes[i].nextSibling.nextSibling.setAttribute("id", "result"+uid);
        // var editor = CodeMirror.fromTextArea(document.getElementById(uid), {
//           lineNumbers: true,
//           mode: "text/html",
//           matchBrackets: true
//         });
        //var myCodeMirror = CodeMirror.fromTextArea(codeBoxes[i]); // codemiror shortcut http://codemirror.net/doc/manual.html#fromTextArea
        //submitCode("result"+uid);
	}
    
}



/*
*
* Switch CSS style for printing. Changes div class "slide-box" to "slide-box-print". 
* Corresponding styles in slidedeck.css
* <input type="checkbox" id="print" onclick="switchSlideBoxStyle()">
*/

function switchSlideBoxStyle() {
    
    var printIt = document.getElementById("print").checked;
    var header = document.getElementsByTagName("header")[0];
    var footer = document.getElementsByTagName("footer")[0];

    if(printIt==true) {
        header.style.display = "none";
        footer.style.display = "none";
        var boxes = document.getElementsByClassName("slide-box");
        for(var i=boxes.length-1; i>=0 ;i--) 
            boxes[i].setAttribute("class", "slide-box-print") ;
        
    } else {
        header.style.display = "block";
        footer.style.display = "block";
        var boxes = document.getElementsByClassName("slide-box-print");
        for(var i=boxes.length-1; i>=0 ;i--) 
            boxes[i].setAttribute("class", "slide-box") ;
    }
      
}

/*
* This enables paging using arraws L anf R
*/
document.onkeydown = function(e) {

	if(paging){
		switch (e.keyCode) {
			case 37:
				if(slideIndex>=0) slideIndex--;
				slideBoxes[slideIndex].scrollIntoView(true);
				break;
			case 38:
				break;
			case 39:
				if(slideIndex<slideBoxes.length) slideIndex++;
				slideBoxes[slideIndex].scrollIntoView(true);
				break;
			case 40:
				
				break;
		}
	}
};


/*
*
* This is the main code editor code
*
*/
var editElement = null;

// pulled from W3 schools, thank you very much
// html editor
function submitCode(element) {
  var text = document.getElementById(element).value;
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("class", "iframeResult");  
  
  document.getElementById("result"+editElement).innerHTML = "";
  document.getElementById("result"+editElement).appendChild(ifr);
  var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
  ifrw.document.open();
  ifrw.document.write(text);  
  ifrw.document.close();
}


function selectEdit(x) {
	editElement = x ;
	document.getElementById(x).addEventListener("keyup", editCode);
	paging = false;
}

function deselectEdit(x) {
	editElement = x ;
	document.getElementById(x).removeEventListener("keyup", editCode) ;
	paging = true;
}

function editCode() {
	//alert(editElement) ;
	submitCode(editElement) ;
}

//
// Processing editor
// Does not handle infintie loop errors - yipes
//////////////////////////
function submitCodeP(element) {
    
  var text = '<script src="../javascript/processing.min.js"></script>\n'; 
  text = text.concat('<script type="application/processing" data-processing-target="pjs">\n'); 
  text = text.concat(document.getElementById(element).value); 
  text = text.concat('\n</script>\n');
  text = text.concat('<canvas id="pjs"> </canvas>');
  
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("class", "iframeResult");  
  
  document.getElementById("result"+editElement).innerHTML = "";
  document.getElementById("result"+editElement).appendChild(ifr);
  var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
  ifrw.document.open();
  ifrw.document.write(text);  
  ifrw.document.close();
}
function selectEditP(x) {
	editElement = x ;
	document.getElementById(x).addEventListener("keyup", editCodeP);
	paging = false;
}

function deselectEditP(x) {
	editElement = x ;
	document.getElementById(x).removeEventListener("keyup", editCodeP) ;
	paging = true;
}

function editCodeP() {
	//alert(editElement) ;
	submitCodeP(editElement) ;
}


// random number generator
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}




function registerEdit(element) {
  element.value = '';
}




//////////////////////////
//////////////////////////
// JS loader and Scrapping of text files
//////////////////////////
//////////////////////////

///////////////////////////
//
// populate the content when the window finishes loading
//
function readDeck(){
    // Default XMLHttpRequest behaviour pulled from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    function reqListener () {
        //console.log(this.responseText);
        //console.log(this.responseText.split('\n'));
        processSlideDeck(this.responseText.split('\n'));
        //document.body.innerHTML=slideDeck;
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", 'slideScripts/'+getQueryVariable("deck"));
    oReq.send(null);
 
}

// https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


//
// Process the slidedeck after the XMLHttpRequest is successful

function processSlideDeck(deck){
    var slides = [] ; // the main lot of slides
    var overview = [] ; // an overview slide with links
    var count = 0 ;
    var mainBody = '' ;
    // populate an array of dictionaries for the slides
    for(let line of deck) {
        // a new slide
        if(line[0]=='+') {
            if(line.slice(1)==='description') continue;
            slides.push({'type':line.slice(1), 'items':[]});
        }
        else if(line[0]=='=') {
            slides[slides.length-1]['heading'] = line.slice(numberOfEqual(line));
            if(numberOfEqual(line)==2) {
                overview[count]=slides[slides.length-1]['heading'];// overview[-1]=slides[-1]
                count++
            }
        
        }
        else if(line[0]=='-') 
            slides[slides.length-1]['image'] = line.slice(1);
        else if(slides.length>0)
            slides[slides.length-1]['items'].push(line);
    }

    count = 0;
    // process all slides and write out to body of document
    for(let slide of slides) {
        // insert the overview if at slide 2 (hackish)
        if(count++ ==1)mainBody+=generateOverview(overview)
        // just keep adding slides
        mainBody+=processSlide(slide) ;
    }
    // then write out slide deck to the content element
    document.getElementById('content').innerHTML = mainBody;
    // and call the slideDeck.js behaviour function from top of this code file
    processDeck();
    


    // function processing slide directives
    function processSlide(slide) {
        var fSlide = '\n';
        //console.log(slide);
        if('heading' in slide) {
            fSlide += '<!-- begin .slide-box ' + slide['heading']+' -->\n' ;
            fSlide += '<a name="'+slide['heading']+'"></a> \n' ;
        }
        // everyone is a slide box
        fSlide += '<section class="slide-box">\n'
        if(slide['type']==='title') {
            
            return fSlide+=processTitle(slide);
        }
        // there is a heading
        if('heading' in slide) fSlide += '\t<h2>'+ slide['heading']+'</h2>\n';
        // then there is a slide type
        fSlide += '\t<div class="slide-'+slide['type']+'">\n';
        
        // normally there is some content
        // treat codeBox as special case
        if('items' in slide) {
            if(slide['type']==='codebox') fSlide += processCode(slide['items'])
            else fSlide += processItems(slide['items']);
        }
    
        fSlide += '\t</div><!-- end div slide-'+slide['type']+' -->\n'
        // special case for imag
        if(slide['type']=='imag' && 'image' in slide){
            fSlide += '\t<img class="slide-image-only" src="'+slide['image']+'">\n';
        }
        // special case for limg
        else if(slide['type']=='limg' && 'image' in slide){
            fSlide += '\t<div class="slide-image">' + '\t\t<img src="'+slide['image']+'">\n' + '\t</div>\n'
        }
        // end section
        fSlide += '</section><!-- end .slide-box -->\n'
        return fSlide;
    }

    // function create hyperlink content overvie slide
    function generateOverview(pageLinks) {
        var fSlide = '\n';
        fSlide += '<!-- begin .slide-box Overview -->\n' ;
        fSlide += '<a name="overview"></a> \n' ;
        fSlide += '<section class="slide-box">\n';
        fSlide += '\t<h2>Overview</h2>\n';
        fSlide += '\t<div class="slide-list">\n';
        fSlide += '\t\t<ul>\n' ;
        for(let item of pageLinks) fSlide += '\t\t\t<li><a href="#'+item+'">'+item+'</a></li>'
        fSlide += '\t\t</ul>\n' ;
        fSlide += '\t</div><!-- end div slide-list -->\n'
        fSlide += '</section><!-- end .slide-box -->\n'
        return fSlide;
    }
       
     // special case for processing title slide
    function processTitle(slide) {
        var fSlide = '\n';
        fSlide = '\t<div class="slide-'+slide['type']+'">\n';
        fSlide += '\t\t<hgroup>\n';
        fSlide += '\t\t\t<h1>' + slide['heading']+'</h1>\n';
        fSlide += '\t\t\t<h3></h3>\n'; // could be for email
        fSlide += processItems(slide['items']) +'</small>';
        fSlide += '\t\t</hgroup>\n';
        fSlide += '<small> print:<input type="checkbox" id="print" onclick="switchSlideBoxStyle()">'
        fSlide += '</div><!-- end .slide-title-->\n'
        fSlide += '</section><!-- end .slide-box -->\n'
        return fSlide
    }
    // special case for processing code
    function processCode(content) {      
        var slide = '\n'              
        slide += '\t<textarea  class="textareaCode" onfocus="selectEdit(this.id)" onBlur="deselectEdit(this.id)">'
        for(let line of content)
            slide += line.replace('<', '&lt;').replace('>', '&gt;') +'\n'
        slide += '\t</textarea>'
        slide += '\t<div class="iframewrapper"></div>'
        slide += '\t</div>'
        return slide
    }

    // this function processes the main content of the slide
    function processItems(items) {
        var content = '\t\t<ul>\n' ;
        var codeMode = false;
        var tabsCounted = 0;
        for(let item of items) {
            if(item=='') continue;
            // first replace some special characters
            // check if code mode is activated
            if(item[0]=='{') {
                codeMode=true;
                content += '<li>\n' + '<pre>\n';
                continue;
            } else if (item[0]=='}' && codeMode) {
                codeMode=false;
                content += '</pre>\n';
                content += '</li>\n';
                continue;
            }
            if(codeMode) {
                content += escapeHtml(item)+'\n' ;
                continue;
            }
            //
            //nested lists denoted with tab
            if(numberOfTabs(item) != tabsCounted) {
                var difference = numberOfTabs(item) - tabsCounted;
                var i=0;
                for(i=0; i<Math.abs(difference); i++) {
                    if(difference>0) content += '\t\t<ul>\n';
                    else content += '\t\t</ul>\n';
                }
                tabsCounted = numberOfTabs(item) ;
            }
            //
            // then expand html tags
            // and replace tabs
             //content += item.replace('&','&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n','').replace('\r','');
            item = escapeHtml(item)
            content += '<li>'+ replaceTags(item) +'</li>\n' 
        }
        //
        // polish it off
        content += '\t\t</ul>\n';
        return content ;
    }


    // http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406
    function escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };

      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }


    // http://stackoverflow.com/questions/7420502/whats-the-best-fastest-way-to-find-the-number-of-tabs-to-start-a-string
    function numberOfTabs(text) {
      var count = 0;
      var index = 0;
      while (text.charAt(index++) === "\t") {
        count++;
      }
      return count;
    }

    function numberOfEqual(text) {
      var count = 0;
      var index = 0;
      while (text.charAt(index++) === "=") {
        count++;
      }
      return count;
    }

    function replaceTags(str) {
        /*
        The regex is: n.b does not support nested tags
        /\\(.+?)\{(.+?)\}/g
        \\ matches backslash
        (.+?) matches and captures anything (as few chars as possible, so up to the first })
        \{ matches {}
        (.+?) matches and captures anything up to }
        \} matches }
        */
        var clean_str = str.replace(/\\(.+?)\{(.+?)\}/g, function(m, tag, content) {
            if(tag==='link') {
                var contents = content.split(/\s/);
                if(contents.length==1) contents[1] = contents[0]
                return '<a href="' + contents[0]+ '" target="_blank">' + contents.slice(1).join(' ') + '</a>';
            }
            else if(tag==='image') {
                return '\t<div class="default-image">' + '\t\t<img src="'+content+'">\n' + '\t</div>\n'
            }
            return '<'+tag+'>' + content + '</'+tag+'>';
        });
        return clean_str;
    }
    };
    
