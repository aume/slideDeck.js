# slideDeck.js
Creating, disseminating, and maintaining lecture slides has long been the standard model of providing students with presentation cues and lecture notes. We describe a system called slideDeck.js that augments the standard model and generates online slide decks using a minimal markup language. Different slide types include bullet points, images, and interactive coding examples. With accessible GUI, mobile responsive design, customizable and interactive content, slideDeck.js provides an accessible learning platform for students to explore lecture material in a way that enhances their learning. slideDeck.js is designed to be flexible for instructors to update content, modify the look and feel of the presentation, and transfer the slide deck between col- leagues teaching the course. Following the ethos of separating presentation from content, slideDeck.js fits into the lecture design workflow automating the generation of presentation slides. Our aim is to make the work of creating dynamic lecture material more time efficient and accessible to instructors, and flexible for students.

---
## Project directory structure

index.html - content browser. This is the index for the course slide decks listed in content.txt<br/>
content.txt - a new line seperated list of the slide decks to display. Just file name, no extension.<br/>
slide-file.html - This is the slideDeck html boiler plate. slide deck is put inside the content div<br/>
<br/>
img -> ... the relative image directory used in the example<br/>
libs -> slidedeck -> slidedeck.css - styling for the slide types<br/>
libs -> slidedeck -> slidedeck.js - macroprocessor and slide behaviour<br/>
slideScripts -> ... slideDeck markup txt files, refenced in content.txt

---

##Usage:
1. Write slide in slideDeck markup (see below), save as [deckname].txt in dir slideScripts.
2. Add [deckname] to content.txt on new line.
3. content.html will now show slide deck in navigator.
4. Either go to deck through the interface or enter URL: slide-file.html?deck=[deckname].txt



##The formatting in the text file for the different slides is as such:

###Title 
+title<br/>
=heading
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdTitle.png)

### List 
+list<br/>
=heading<br/>
A basic list. tabbing nests lists
Item 1<br />
&nbsp;Item 1.1<br />
&nbsp;&nbsp;Item 1.1.1<br />
&nbsp;&nbsp;Item 1.1.2<br />
Item 2
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdList.png)


### List with image 
+limg<br/>
=heading<br/>
Item 1<br/>
Item 2<br/>
-img/picutre.blah
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdLIMG.png)


### Full size image
+imag<br/>
=heading<br/>
-img/picutre.blah

### Hidden description, shows up in content browser
+description<br/>
A description of the page<br/>
which is hidden 


### HTML editor 
+codebox<br/>
=heading<br/>
demo code
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdCode.png)


## Other slidedech features

### Overview slide
Using a double assignment operator == puts a hyperlink to a slide in an overview slide.
Such that:
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdOverview.png)


### Hyperlinks
Using the command \link(URL anchor text) wrapes the anchor text in an a href with src=URL
 ![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdLink.png)
 
### Tags
To wrap text in an HTML tag use the syntax: \tag{text to wrap}, where tag is a HTML tag like em strong etc.
![alt tag](https://raw.githubusercontent.com/aume/slideDeck.js/master/img/sdTags.png)


### Video
Insert a you tube or vimeo player into the slide. The path to the player for Vimeo, or embedd must be used. e.g.
\tube{https://player.vimeo.com/video/166694596}
\tube{https://www.youtube.com/embed/6aZbJS6LZbs}
 

 


