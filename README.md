# slideDeck.js
Creating, disseminating, and maintaining lecture slides has long been the standard model of providing students with presentation cues and lecture notes. We describe a system called slideDeck.js that augments the standard model and generates online slide decks using a minimal markup language. Different slide types include bullet points, images, and interactive coding examples. With accessible GUI, mobile responsive design, customizable and interactive content, slideDeck.js provides an accessible learning platform for students to explore lecture material in a way that enhances their learning. slideDeck.js is designed to be flexible for instructors to update content, modify the look and feel of the presentation, and transfer the slide deck between col- leagues teaching the course. Following the ethos of separating presentation from content, slideDeck.js fits into the lecture design workflow automating the generation of presentation slides. Our aim is to make the work of creating dynamic lecture material more time efficient and accessible to instructors, and flexible for students.

---

##Usage:
1. Write slide in slideDeck markup (see below), save as [deckname].txt in dir slideScripts.
2. Add [deckname] to content.txt on new line.
3. content.html will now show slide deck in navigator.
4. Either go to deck through the interface or enter URL: slide-file.html?deck=[deckname].txt



##The formatting in the text file for the different slides is as such:

###Title 
+title
=heading

### List 
+list
Item 1
Item 2

### HTML editor 
+codebox
<html>
</html>

### List with image 
+limg
Item 1
Item 2
-img/picutre.blah

### Full size image
+imag
-img/picutre.blah

## Hidden description, shows up in content browser
+description
A description of the page
which is hidden 