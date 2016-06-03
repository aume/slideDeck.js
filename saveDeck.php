<?php

/*
* saveDeck.php
*/


$textarea = $_POST['text'] ;
$filename = $_POST['deckname'] ;


$myfile = fopen($filename, "w") or die("Unable to open file!");

fwrite($myfile,$textarea);
fclose($myfile);


?>



